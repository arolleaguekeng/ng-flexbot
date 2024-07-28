import { TestBed } from '@angular/core/testing';
import { GeminiServiceService } from './gemini-service.service';
import { FileConversionService } from '../file-conversion.service';
import { FbSharedServiceService } from '../fb-shared-service.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpClient } from '@angular/common/http';
import {
  FlexbotCurrentImageModel,
  FlexbotCurrentTextModel,
} from '../../models/flexbot-current-llm.enum';

jest.mock('../file-conversion.service');
jest.mock('../fb-shared-service.service');
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn(),
  })),
}));

describe('GeminiServiceService', () => {
  let service: GeminiServiceService;
  let fileConversionService: FileConversionService;
  let fbSharedService: FbSharedServiceService;
  let mockGoogleGenerativeAI: any;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GeminiServiceService,
        {
          provide: FileConversionService,
          useValue: {
            convertToBase64: jest.fn(),
          },
        },
        {
          provide: FbSharedServiceService,
          useValue: {
            googleApikey: 'mockApiKey',
            flexbotCurrentTextModel: FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO,
            flexbotCurrentImageModel:
              FlexbotCurrentImageModel.GOOGLE_GEMINI_1_5_FLASH,
            chatHistory: [],
          },
        },
      ],
    });

    service = TestBed.inject(GeminiServiceService);
    fileConversionService = TestBed.inject(FileConversionService);
    fbSharedService = TestBed.inject(FbSharedServiceService);
    mockGoogleGenerativeAI = new GoogleGenerativeAI(
      fbSharedService.googleApikey
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
