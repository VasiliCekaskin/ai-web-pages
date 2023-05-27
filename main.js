import fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { ProjectCreator } from "./projectCreator.js";

dotenv.config();

console.info("Starting up...");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

fs.readFile("./prompt.txt", "utf8", async (err, prompt) => {
  try {
    console.info("File read success.");

    let response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          content: prompt,
          role: "user",
        },
      ],
    });

    Math.random().toString(36).substring(7);
    const projectInfo = JSON.parse(response.data.choices[0].message.content);

    console.info("File Contents", {
      projectInfo,
    });

    new ProjectCreator().call(projectInfo);

    console.log("Projeeect yeay!");
  } catch (err) {
    console.error("Error: ", err.message);

    throw err;
  }
});
