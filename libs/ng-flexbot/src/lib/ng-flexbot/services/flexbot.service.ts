import { Injectable } from '@angular/core';

import {
  FlexbotCurrentImageModel,
  FlexbotCurrentTextModel,
} from '../models/flexbot-current-llm.enum';
import { GeminiServiceService } from './ai-models-services/gemini-service.service';
import { OpenaiServiceService } from './ai-models-services/openai-service.service';

@Injectable({
  providedIn: 'root',
})
export class FlexbotService {
  apikey = 'YOUR_API_KEY';
  flexbotCurrentTextModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
  flexbotCurrentImageModel = FlexbotCurrentImageModel.GOOGLE_GEMINI_PRO_VISION;
  promptContext = 'tu es un developpeur senior';
  chatHistory = [];
  constructor(
    private openaiService: OpenaiServiceService,
    private geminiService: GeminiServiceService
  ) {}

  generateText(prompt: string): Promise<any> {
    if (this.getSelectedAiTextProvider() === 'openai') {
      return this.openaiService.generateText(prompt);
    }
    if (this.getSelectedAiTextProvider() === 'google') {
      return this.geminiService.generateText(prompt);
    }
    return Promise.resolve();
  }

  async generateTextByImage(file: File, promptText: string): Promise<any> {
    if (this.getSelectedAiImageProvider() === 'openai') {
      return this.openaiService.generateTextByImage(file, promptText);
    }
    if (this.getSelectedAiImageProvider() === 'google') {
      return this.geminiService.generateTextByImage(file, promptText);
    }
  }

  generateTextStream(prompt: string): Promise<any> {
    if (this.getSelectedAiTextProvider() === 'openai') {
      return this.openaiService.generateTextStream(prompt);
    }
    if (this.getSelectedAiTextProvider() === 'google') {
      return this.geminiService.geminiProStreaming(prompt);
    }
    return Promise.resolve();
  }

  private getSelectedAiTextProvider() {
    return this.getSelectedAiProvider(this.flexbotCurrentTextModel);
  }

  private getSelectedAiImageProvider() {
    return this.getSelectedAiProvider(this.flexbotCurrentImageModel);
  }
  private getSelectedAiProvider(model: string): string {
    if (this.splitEnumValue(model)[0].toLowerCase().includes('openai')) {
      return 'openai';
    }
    if (this.splitEnumValue(model)[0].toLowerCase().includes('google')) {
      return 'google';
    }
    return '';
  }
  private splitEnumValue(enumValue: string): string[] {
    return enumValue.split('/');
  }
}
