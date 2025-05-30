import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

export const careerDiffAgent = new Agent({
  name: "Career Diff Agent",
  description: "Gitの差分内容からdocs/index.md内の職歴関連の変更があるかを判定します。出力はJSON形式で、{hasRelevantChanges:boolean, changedSection:string|null}の形で返してください。",
  instructions: `
以下のGit差分(マークダウン形式)を解析し、docs/index.md内に職歴関連(経歴、キャリア、スキル、経験など)の変更があるか判定してください。
出力は厳密に JSON オブジェクト形式で以下のキーを含めてください:
- hasRelevantChanges: true または false
- changedSection: 見つかった場合はセクション名(例: "職歴")、見つからない場合は null
`,
  model: openai("gpt-4o"),
}); 