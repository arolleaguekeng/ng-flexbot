import { Injectable } from '@angular/core';
import { FlexbotCurrentTextModel, FlexbotCurrentImageModel } from '../models/flexbot-current-llm.enum';

@Injectable({
  providedIn: 'root'
})
export class FbSharedServiceService {

  isStreaming = false;
  stramingResponse: any;
  apikey = "YOUR_API_KEY";
  flexbotCurrentTextModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
  flexbotCurrentImageModel = FlexbotCurrentImageModel.GOOGLE_GEMINI_PRO_VISION
  promptContext = 'tu es un developpeur senior';
  chatHistory: any[] = [];
}
