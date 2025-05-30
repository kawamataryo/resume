import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { MCPClient } from "@mastra/mcp";

const mcp = new MCPClient({
  servers: {
    git: {
      command: "uvx",
      args: ["mcp-server-git", "--repository", "/Users/ryo/ghq/github.com/kawamataryo/resume"],
      timeout: 30000,
    },
  },
});

const tools = await mcp.getTools();

export const gitMcpAgent = new Agent({
  name: "Git MCP Agent",
  description: "Git操作とリポジトリ管理を行うエージェント",
  instructions: `
あなたはGitリポジトリの操作と管理をサポートするエージェントです。

以下の機能を提供できます：

## Git操作機能
- git_diff_unstaged: ステージングされていない変更の差分を取得
- git_diff_staged: ステージングされている変更の差分を取得
- git_diff: ブランチ間やコミット間の差分を取得
- git_status: リポジトリの現在の状態を確認
- git_log: コミット履歴を取得
- git_show: 特定のコミットの詳細を表示

## 主な使用例
- 現在のブランチとmain/masterブランチとの差分確認
- ファイルの変更状況の確認
- リポジトリの状態監視
- コミット履歴の確認

特に、docs/index.mdファイルの変更を含む差分を分析することを得意とします。
差分の中で職歴やスキル、プロジェクト経験に関する変更を識別し、それらの重要性を評価します。

現在のブランチとmaster/mainブランチとの差分を確認する場合は、git_diffツールを使用してください。
targetパラメータに "master...HEAD" または "main...HEAD" を指定することで、ベースブランチとの差分を取得できます。
  `,
  model: openai("gpt-4o"),
  tools,
}); 