import { CreateChatCompletionResponse } from "openai";
import { Prompter } from "../../Prompter";
import { AxiosResponse } from "axios";

export abstract class BasePrompt<ExpectedResponse> {
  filePath;
  lastResponse: null | ExpectedResponse;

  constructor() {
    this.filePath = `${__dirname}/prompt.txt`;
    this.lastResponse = null;
  }

  async generateResponse() {
    const prompter = new Prompter(this);
    const rawResponse = await prompter.askGpt();
    this.lastResponse = this.parseResponse(rawResponse);
  }

  abstract parseResponse(
    openAiResponse: AxiosResponse<CreateChatCompletionResponse, any>
  ): ExpectedResponse;
}
