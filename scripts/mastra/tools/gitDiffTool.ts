import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const gitDiffTool = createTool({
  id: "gitDiff",
  description: "現在のブランチと指定ベースブランチの差分を取得します",
  inputSchema: z.object({
    repoPath: z.string().describe("Git リポジトリのパス"),
    base: z.string().default("master").describe("比較対象のベースブランチ"),
  }),
  outputSchema: z.object({
    diff: z.string(),
  }),
  execute: async ({ context }) => {
    const { repoPath, base } = context;
    const { stdout } = await execAsync(`git -C ${repoPath} diff ${base}...HEAD`);
    return { diff: stdout };
  },
}); 