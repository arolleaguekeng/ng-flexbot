import { Injectable } from '@angular/core';
import {
  FlexbotCurrentTextModel,
  FlexbotCurrentImageModel,
} from '../models/flexbot-current-llm.enum';

@Injectable({
  providedIn: 'root',
})
/**
 * Service for managing shared data and functionality related to Flexbot.
 */
export class FbSharedServiceService {
  isStreaming = false;
  stramingResponse: any;
  googleApikey = 'YOUR_GOOGLE_API_KEY';
  openaiApikey = 'YOUR_OPEN_AI_API_KEY';
  flexbotCurrentTextModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
  flexbotCurrentImageModel = FlexbotCurrentImageModel.GOOGLE_GEMINI_1_5_FLASH;
  promptContext = 'tu es un developpeur senior';
  chatHistory: any[] = [];
}
