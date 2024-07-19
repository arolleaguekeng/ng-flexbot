import { inject, Injectable } from '@angular/core';

import { GeminiServiceService } from './ai-models-services/gemini-service.service';
import { OpenaiServiceService } from './ai-models-services/openai-service.service';
import { FbSharedServiceService } from './fb-shared-service.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for generating text using AI providers.
 */
export class FlexbotService {
  constructor(
    private openaiService: OpenaiServiceService,
    private geminiService: GeminiServiceService
  ) {}

  fbSharedService = inject(FbSharedServiceService);

  /**
   * Generates text based on the given prompt.
   * @param prompt The prompt for generating text.
   * @returns A promise that resolves to the generated text.
   */
  generateText(prompt: string): Promise<any> {
    if (this.getSelectedAiTextProvider() === 'openai') {
      return this.openaiService.generateText(prompt);
    }
    if (this.getSelectedAiTextProvider() === 'google') {
      return this.geminiService.generateText(prompt);
    }
    return Promise.resolve();
  }

  /**
   * Generates text based on the given image file and prompt text.
   * @param file The image file.
   * @param promptText The prompt text.
   * @returns A promise that resolves to the generated text.
   */
  async generateTextByImage(file: File, promptText: string): Promise<any> {
    if (this.getSelectedAiImageProvider() === 'openai') {
      return this.openaiService.generateTextByImage(file, promptText);
    }
    if (this.getSelectedAiImageProvider() === 'google') {
      return this.geminiService.generateTextByImage(file, promptText);
    }
  }

  /**
   * Generates text as a stream based on the given prompt.
   * @param prompt The prompt for generating text.
   * @returns A promise that resolves to the generated text.
   */
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
    return this.getSelectedAiProvider(
      this.fbSharedService.flexbotCurrentTextModel
    );
  }

  private getSelectedAiImageProvider() {
    return this.getSelectedAiProvider(
      this.fbSharedService.flexbotCurrentImageModel
    );
  }

  /**
   * Returns the selected AI provider based on the given model.
   * @param model - The model to check.
   * @returns The selected AI provider ('openai', 'google') or an empty string if no provider is found.
   */
  private getSelectedAiProvider(model: string): string {
    if (this.splitEnumValue(model)[0].toLowerCase().includes('openai')) {
      return 'openai';
    }
    if (this.splitEnumValue(model)[0].toLowerCase().includes('google')) {
      return 'google';
    }
    return '';
  }

  /**
   * Splits the given enum value by '/' and returns an array of strings.
   *
   * @param enumValue - The enum value to be split.
   * @returns An array of strings representing the split enum value.
   */
  private splitEnumValue(enumValue: string): string[] {
    return enumValue.split('/');
  }
}
