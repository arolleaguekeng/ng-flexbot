import { inject, Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FileConversionService } from '../file-conversion.service';
import { FbSharedServiceService } from '../fb-shared-service.service';

@Injectable({
  providedIn: 'root',
})
export class GeminiServiceService {
  constructor(private fileConversionService: FileConversionService) {}

  fbSharedService = inject(FbSharedServiceService);

  genAI = new GoogleGenerativeAI(this.fbSharedService.apikey);
  textModel = this.genAI.getGenerativeModel({
    model: this.fbSharedService.flexbotCurrentTextModel.split('/')[1],
  });
  imageModel = this.genAI.getGenerativeModel({
    model: this.fbSharedService.flexbotCurrentImageModel.split('/')[1],
  });
  /**
   * Generates text based on the given prompt.
   * @param prompt - The prompt for generating text.
   * @returns A Promise that resolves to the generated text.
   */
  generateText(prompt: string): Promise<any> {
    this.genAI = new GoogleGenerativeAI(this.fbSharedService.apikey);
    this.textModel = this.genAI.getGenerativeModel({
      model: this.fbSharedService.flexbotCurrentTextModel.split('/')[1],
    });
    console.log('prompt', prompt);
    console.log('promptContext', this.fbSharedService.promptContext);
    console.log('textModel', this.fbSharedService.flexbotCurrentTextModel.split('/')[1]);
    console.log('apikey', this.fbSharedService.apikey);
    console.log('gemini', this.genAI);

    const test: {
      role: string;
      parts: {
        text: string;
      }[];
    }[] = [
      {
        role: 'user',
        parts: [{ text: this.fbSharedService.promptContext }],
      },
      {
        role: 'model',
        parts: [{ text: 'oui exact' }],
      },
    ];

    for (const item of this.fbSharedService.chatHistory) {
      test.push(item);
    }

    const chat = this.textModel.startChat({
      history: test,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    this.fbSharedService.chatHistory?.push({
      role: 'user',
      parts: [{ text: prompt }],
    });
    return chat.sendMessage(prompt);
  }

  /**
   * Generates text based on an image and a prompt.
   * @param file - The image file to generate text from.
   * @param promptText - The prompt text to use for generating the content.
   * @returns A Promise that resolves to the generated text.
   */
  async generateTextByImage(file: File, promptText: string): Promise<any> {
    this.genAI = new GoogleGenerativeAI(this.fbSharedService.apikey);
    this.textModel = this.genAI.getGenerativeModel({
      model: this.fbSharedService.flexbotCurrentImageModel.split('/')[1],
    });
    console.log('prompt', this.fbSharedService.flexbotCurrentImageModel.split('/')[1]);
    try {
      const imageBase64 = await this.fileConversionService.convertToBase64(
        URL.createObjectURL(file)
      );

      // Check for successful conversion to Base64
      if (typeof imageBase64 !== 'string') {
        console.error('Image conversion to Base64 failed.');
        return;
      }
      // Model initialisation missing for brevity
      const prompt = [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64,
          },
        },
        {
          text: promptText,
        },
      ];
      const result = await this.imageModel.generateContent(prompt);
      const response = await result.response;
      console.log(response.text());
      return response.text();
    } catch (error) {
      console.error('Error converting file to Base64', error);
      return null;
    }
  }

  async geminiProStreaming(promptText: string) {
    // Model initialisation missing for brevity
    const prompt = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
    };
    const streamingResp = await this.textModel.generateContentStream(prompt);
    for await (const item of streamingResp.stream) {
      console.log('stream chunk: ' + item.text());

      this.fbSharedService.stramingResponse = item.text();
    }
    console.log(
      'aggregated response: ' + (await streamingResp.response).text()
    );
  }
}
