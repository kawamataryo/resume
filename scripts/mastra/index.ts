import { Mastra } from "@mastra/core";
import { laprasMcpAgent } from "./agents/laprasMcpAgent";

export const mastra = new Mastra({
  agents: { laprasMcpAgent },
});
