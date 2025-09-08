import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

export async function AIGenerator(prompt: string) {
  // initialize a new ai obj using gemini api key
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt.trim(),
    });
    console.log("WORKS HERE");
    // there can be 2 outputs by AI
    // 1. Questions generated
    // 2. Feedback generated

    // convert the string to array using JSON prase method and pass response.text as string
    console.log(response);
    const result = JSON.parse(response.text as string);
    return result;
  } catch (error) {
    // TODO: handle the error gracefully
    console.log("ERROR FROM AI.ts file");
    console.log(error);
    return;
  }
}
