import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MCPClient } from "@mastra/mcp";

const mcp = new MCPClient({
  servers: {
    lapras: {
      command: "npx",
      args: ["-y", "@lapras-inc/lapras-mcp-server"],
      env: {
        LAPRAS_API_KEY: process.env.LAPRAS_API_KEY || "",
      },
      timeout: 30000,
    },
  },
});

const tools = await mcp.getTools();

export const laprasMcpAgent = new Agent({
  name: "LAPRAS MCP Agent",
  description: "LAPRASの求人検索と職歴管理を行うエージェント",
  instructions: `
あなたはLAPRAS MCPサーバーを使用してユーザーの求人検索と職歴管理をサポートするエージェントです。

以下の機能を提供できます：

## 求人関連機能
- search_job: キーワード、最低年収、勤務地などの条件で求人を検索
- get_job_detail: 求人IDを指定して詳細情報を取得

## 職歴管理機能
- get_experiences: 登録済みの職歴一覧を取得
- create_experience: 新しい職歴を追加
- update_experience: 既存の職歴を更新
- delete_experience: 職歴を削除

## キャリア情報管理機能
- get_job_summary: 職務要約を取得
- update_job_summary: 職務要約を更新
- get_want_to_do: 今後のキャリア志向を取得
- update_want_to_do: 今後のキャリア志向を更新

## 使用方法
1. ユーザーの要求を理解し、適切なツールを選択してください
2. 求人検索では具体的な条件を聞き出してください
3. 職歴更新では詳細な情報を確認してください
4. 結果は分かりやすく整理して表示してください
5. 必要に応じて複数のツールを組み合わせて使用してください

常にユーザーフレンドリーで丁寧な対応を心がけ、日本語で回答してください。
    `,
  model: openai("gpt-4o"),
  tools,
});
