import { Injectable } from '@angular/core';
import { FlexbotCurrentTextModel, FlexbotCurrentImageModel } from '../../models/flexbot-current-llm.enum';
import OpenAI from "openai";
import { ChatCompletionMessageParam } from 'openai/resources';
@Injectable({
  providedIn: 'root'
})
export class OpenaiServiceService {
  apikey = "YOUR_API_KEY";
  flexbotCurrentTextModel = FlexbotCurrentTextModel.OPEN_AI_GPT_4o_MINI;
  flexbotCurrentImageModel = FlexbotCurrentImageModel.OPEN_AI_DALL_E_3;
  chatContext = 'tu es un developpeur senior';
  chatHistory: ChatCompletionMessageParam[] = [
    {
      role: 'user',
      content: this.chatContext,
    },
  ];
  generateText(prompt: string): Promise<any> {
    const openai = new OpenAI();
    this.chatHistory.push({
      role: 'user',
      content: prompt,
    });
    return   openai.chat.completions.create({
      messages: this.chatHistory,
      model: this.flexbotCurrentTextModel,
    });
  }


  async generateTextByImage(file: File, promptText: string): Promise<any> {
    const openai = new OpenAI();
    // const image = await openai.files.create({ file });
    this.chatHistory.push({
      role: 'user',
      content: promptText,
    });
    return openai.chat.completions.create({
      messages: this.chatHistory,
      model: this.flexbotCurrentImageModel,
    });

  }
  generateTextStream(prompt: string): Promise<any> {
    const openai = new OpenAI();
    this.chatHistory.push({
      role: 'user',
      content: prompt,
    });
    return openai.chat.completions.create({
      messages: this.chatHistory,
      model: this.flexbotCurrentTextModel,
    });
  }
}
