import dotenv from "dotenv";
dotenv.config();

import { GetProjectTitlePrompt } from "./lib/prompts/GenerateProjectTitlePrompt/GenerateProjectTitlePrompt";

(async () => {
  console.info("Starting up...");

  const prompt = new GetProjectTitlePrompt();
  await prompt.generateResponse();
  console.info(prompt.lastResponse);
})();
