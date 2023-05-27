import { AxiosResponse } from "axios";
import { CreateChatCompletionResponse } from "openai";
import { BasePrompt } from "../BasePrompt/BasePrompt";

export type GetProjectTitlePromptResponse = {
  projectTitle: string;
};

export class GetProjectTitlePrompt extends BasePrompt<GetProjectTitlePromptResponse> {
  parseResponse(
    openAiResponse: AxiosResponse<CreateChatCompletionResponse, any>
  ): GetProjectTitlePromptResponse {
    const content = openAiResponse.data?.choices[0]?.message?.content;
    if (content) {
      return JSON.parse(content) as GetProjectTitlePromptResponse;
    } else {
      throw new Error("Failed to parse response.");
    }
  }
}
