import { inject, Injectable } from '@angular/core';
import OpenAI from 'openai';
import { FbSharedServiceService } from '../fb-shared-service.service';
@Injectable({
  providedIn: 'root',
})
export class OpenaiServiceService {
  fbSharedService = inject(FbSharedServiceService);

  /**
   * Generates text based on the provided prompt using the OpenAI chat model.
   * @param prompt - The prompt for generating the text.
   * @returns A Promise that resolves to the generated text.
   */
  generateText(prompt: string): Promise<any> {
    const openai = new OpenAI();
    this.fbSharedService.chatHistory.push({
      role: 'user',
      content: prompt,
    });
    return openai.chat.completions.create({
      messages: this.fbSharedService.chatHistory,
      model: this.fbSharedService.flexbotCurrentTextModel,
    });
  }

  /**
   * Generates text based on an image and a prompt text.
   * @param file - The image file.
   * @param promptText - The prompt text to use for generating the text.
   * @returns A Promise that resolves to the generated text.
   */
  async generateTextByImage(file: File, promptText: string): Promise<any> {
    const openai = new OpenAI();
    // const image = await openai.files.create({ file });
    this.fbSharedService.chatHistory.push({
      role: 'user',
      content: promptText,
    });
    return openai.chat.completions.create({
      messages: this.fbSharedService.chatHistory,
      model: this.fbSharedService.flexbotCurrentImageModel,
    });
  }
  /**
   * Generates a text stream based on the given prompt.
   * @param prompt - The prompt for generating the text stream.
   * @returns A Promise that resolves to the generated text stream.
   */
  generateTextStream(prompt: string): Promise<any> {
    const openai = new OpenAI();
    this.fbSharedService.chatHistory.push({
      role: 'user',
      content: prompt,
    });
    return openai.chat.completions.create({
      messages: this.fbSharedService.chatHistory,
      model: this.fbSharedService.flexbotCurrentTextModel,
    });
  }
}
