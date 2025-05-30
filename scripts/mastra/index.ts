import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";
import { laprasMcpAgent } from "./agents/laprasMcpAgent";
import { gitMcpAgent } from "./agents/gitMcpAgent";
import { gitLaprasSyncWorkflow } from "./workflows/gitLaprasSyncWorkflow";

const storage = new LibSQLStore({
  url: "file:./mastra.db",
});

export const mastra = new Mastra({
  agents: { 
    laprasMcpAgent,
    gitMcpAgent,
  },
  workflows: { gitLaprasSyncWorkflow },
  storage,
});
