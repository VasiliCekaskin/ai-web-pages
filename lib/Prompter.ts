import fs from "fs";
import { Configuration } from "openai";
import { OpenAIApi } from "openai";
import { BasePrompt } from "./prompts/BasePrompt/BasePrompt";

export type BaseGeneratorConfig = {
  promptConfig: {
    model: string;
  };
  options: {
    logLevel: "info" | "debug";
  };
};

export class Prompter {
  options: any;
  prompt: BasePrompt<any>;

  constructor(prompt: BasePrompt<any>, options: any = { logLevel: "info" }) {
    this.prompt = prompt;
    this.options = options;
  }

  async askGpt() {
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    this.#log("Generating response .........", "info");

    if (!openai) {
      throw new Error("OpenAI instance is not defined.");
    }

    const prompt = this.#loadPrompt();

    this.#log(`${prompt}`, "debug");

    const response = await openai.createChatCompletion({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    this.#log(`${response}`, "debug");

    if (!response) {
      throw new Error("Failed to generate response.");
    }

    this.#log("Generating response Finished.", "info");

    return response;
  }

  #loadPrompt() {
    const prompt = fs.readFileSync(`${this.prompt.filePath}`, "utf8");

    if (!prompt) {
      throw new Error("Prompt file is empty.");
    }

    this.#log("Prompt loaded successfully.", "debug");

    return prompt;
  }

  #log(message: string, level: BaseGeneratorConfig["options"]["logLevel"]) {
    if (level != this.options.logLevel) {
      return;
    }

    console.log(`[${this.#className()}] ${message.toString()}`, {
      level,
    });
  }

  #className() {
    return this.constructor.name;
  }
}
