import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";

export const careerDiffTool = createTool({
  id: "careerDiff",
  description: "docs/index.md の差分から職歴関連の変更を判定します",
  inputSchema: z.object({
    diff: z.string().describe("Git 差分テキスト"),
  }),
  outputSchema: z.object({
    hasRelevantChanges: z.boolean(),
    changedSection: z.string().nullable(),
  }),
  execute: async ({ context }) => {
    const { diff } = context;
    const prompt = `
以下の差分から docs/index.md 内の職歴関連の変更があるか判定してください。
出力は JSON: {hasRelevantChanges:boolean, changedSection:string|null} の形で返してください。

${diff}
`;
    // OpenAI プロバイダで直接 LLM を呼び出す
    const model = openai("gpt-4o");
    const out = await model.doGenerate({
      inputFormat: "messages",
      mode: { type: "regular" },
      prompt: [
        { role: "user", content: [{ type: "text", text: prompt }] }
      ],
    });
    // doGenerate の戻り値 text をパース
    return JSON.parse(out.text || "{}");
  },
}); 