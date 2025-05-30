import { createWorkflow, createStep } from "@mastra/core";
import { z } from "zod";
import { laprasMcpAgent } from "../agents/laprasMcpAgent";
import { gitDiffTool } from "../tools/gitDiffTool";
import { careerDiffTool } from "../tools/careerDiffTool";
import { RuntimeContext } from "@mastra/core/di";

// Git差分チェック用ステップ
const checkGitDiffStep = createStep({
  id: "checkGitDiff",
  description: "Git差分を確認してdocs/index.mdに職歴関連の変更があるかをチェックする",
  inputSchema: z.object({
    repoPath: z.string().default("/Users/ryo/ghq/github.com/kawamataryo/resume"),
  }),
  outputSchema: z.object({
    hasRelevantChanges: z.boolean(),
    diffContent: z.string().optional(),
    changedSection: z.string().optional(),
  }),
  execute: async ({ inputData }) => {
    const { repoPath } = inputData;
    const runtimeContext = new RuntimeContext();
    try {
      // gitDiffTool で差分取得
      const { diff } = await gitDiffTool.execute({ context: { repoPath, base: "master" }, runtimeContext });
      // careerDiffTool で職歴関連変更を判定
      const { hasRelevantChanges, changedSection } =
        await careerDiffTool.execute({ context: { diff }, runtimeContext });
      return {
        hasRelevantChanges,
        diffContent: diff,
        changedSection: changedSection || undefined,
      };
    } catch (error: any) {
      throw new Error(`Git diff or analysis failed: ${error.message}`);
    }
  },
});

// LAPRAS職歴取得ステップ
const getLaprasCareerStep = createStep({
  id: "getLaprasCareer",
  description: "LAPRAS MCPを使用して現在の職歴を取得する",
  inputSchema: z.object({
    hasRelevantChanges: z.boolean(),
    diffContent: z.string().optional(),
    changedSection: z.string().optional(),
  }),
  outputSchema: z.object({
    currentCareer: z.string(),
    experiences: z.array(z.any()).optional(),
  }),
  execute: async ({ inputData, mastra }) => {
    try {
      const laprasAgent = laprasMcpAgent;
      
      const careerResult = await laprasAgent.generate([{
        role: "user",
        content: "現在のLAPRASの職歴情報を取得してください。get_experiencesツールを使用して、すべての経験データを取得してください。"
      }]);
      
      return {
        currentCareer: careerResult.text || "",
        experiences: [], // 実際のレスポンスからパースする必要があります
      };
      
    } catch (error) {
      throw new Error(`LAPRAS職歴の取得に失敗しました: ${error.message}`);
    }
  },
});

// 職歴比較ステップ
const compareCareerStep = createStep({
  id: "compareCareer",
  description: "差分の内容とLAPRASの職歴を比較する",
  inputSchema: z.object({
    currentCareer: z.string(),
    experiences: z.array(z.any()).optional(),
  }),
  outputSchema: z.object({
    needsUpdate: z.boolean(),
    updateReason: z.string().optional(),
    missingInfo: z.string().optional(),
  }),
  execute: async ({ inputData }) => {
    const { diffContent, changedSection, currentCareer } = inputData;
    
    // 差分の内容がLAPRASの職歴に含まれているかチェック
    const diffLines = diffContent.split('\n').filter(line => 
      line.startsWith('+') && !line.startsWith('+++')
    );
    
    let needsUpdate = false;
    let updateReason = "";
    let missingInfo = "";
    
    for (const line of diffLines) {
      const content = line.substring(1).trim(); // '+' を除去
      
      if (content && !currentCareer.includes(content)) {
        needsUpdate = true;
        missingInfo += content + "\n";
      }
    }
    
    if (needsUpdate) {
      updateReason = `以下の新しい情報がLAPRASの職歴に含まれていません:\n${missingInfo}`;
    }
    
    return {
      needsUpdate,
      updateReason,
      missingInfo,
    };
  },
});

// LAPRAS職歴更新ステップ
const updateLaprasCareerStep = createStep({
  id: "updateLaprasCareer",
  description: "LAPRASの職歴を差分の内容で更新する",
  inputSchema: z.object({
    needsUpdate: z.boolean(),
    updateReason: z.string().optional(),
    missingInfo: z.string().optional(),
  }),
  outputSchema: z.object({
    updateResult: z.string(),
    success: z.boolean(),
  }),
  execute: async ({ inputData, mastra }) => {
    const { missingInfo } = inputData;
    
    try {
      const laprasAgent = laprasMcpAgent;
      
      const updateResult = await laprasAgent.generate([{
        role: "user",
        content: `以下の新しい職歴情報をLAPRASに追加してください。適切なcreate_experienceやupdate_experienceツールを使用してください:\n\n${missingInfo}`
      }]);
      
      return {
        updateResult: updateResult.text || "",
        success: true,
      };
      
    } catch (error) {
      return {
        updateResult: `LAPRAS職歴の更新に失敗しました: ${error.message}`,
        success: false,
      };
    }
  },
});

// ワークフロー定義をmethodチェーン方式に変更します
export const gitLaprasSyncWorkflow = createWorkflow({
  id: "gitLaprasSyncWorkflow",
  inputSchema: z.object({ repoPath: z.string().default("/Users/ryo/ghq/github.com/kawamataryo/resume") }),
  outputSchema: z.any(), // 必要に応じて具体的なスキーマに変更
  steps: [checkGitDiffStep, getLaprasCareerStep, compareCareerStep, updateLaprasCareerStep],
})
  .then(checkGitDiffStep)
  .then(getLaprasCareerStep)
  .then(compareCareerStep)
  .then(updateLaprasCareerStep)
  .commit(); 