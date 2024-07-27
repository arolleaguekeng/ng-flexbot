import { TestBed } from '@angular/core/testing';
import { FlexbotService } from './flexbot.service';
import { OpenaiServiceService } from './ai-models-services/openai-service.service';
import { GeminiServiceService } from './ai-models-services/gemini-service.service';
import { FbSharedServiceService } from './fb-shared-service.service';
import { FlexbotCurrentImageModel, FlexbotCurrentTextModel } from '../models/flexbot-current-llm.enum';

describe('FlexbotService', () => {
  let service: FlexbotService;
  let openaiService: OpenaiServiceService;
  let geminiService: GeminiServiceService;
  let fbSharedService: FbSharedServiceService;

  beforeEach(() => {
    const openaiServiceMock = {
      generateText: jest.fn(),
      generateTextByImage: jest.fn(),
      generateTextStream: jest.fn(),
    };

    const geminiServiceMock = {
      generateText: jest.fn(),
      generateTextByImage: jest.fn(),
      geminiProStreaming: jest.fn(),
    };

    const fbSharedServiceMock = {
      flexbotCurrentTextModel: 'openai/model',
      flexbotCurrentImageModel: 'google/model',
    };

    TestBed.configureTestingModule({
      providers: [
        FlexbotService,
        { provide: OpenaiServiceService, useValue: openaiServiceMock },
        { provide: GeminiServiceService, useValue: geminiServiceMock },
        { provide: FbSharedServiceService, useValue: fbSharedServiceMock },
      ],
    });

    service = TestBed.inject(FlexbotService);
    openaiService = TestBed.inject(OpenaiServiceService);
    geminiService = TestBed.inject(GeminiServiceService);
    fbSharedService = TestBed.inject(FbSharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate text using OpenAI', async () => {
    const prompt = 'Hello, world!';
    const response = 'Generated text';
    (openaiService.generateText as jest.Mock).mockResolvedValue(response);

    const result = await service.generateText(prompt);
    
    expect(openaiService.generateText).toHaveBeenCalledWith(prompt);
    expect(result).toBe(response);
  });

  it('should generate text using Gemini', async () => {
    fbSharedService.flexbotCurrentTextModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
    const prompt = 'Hello, world!';
    const response = 'Generated text';
    (geminiService.generateText as jest.Mock).mockResolvedValue(response);

    const result = await service.generateText(prompt);

    expect(geminiService.generateText).toHaveBeenCalledWith(prompt);
    expect(result).toBe(response);
  });

  // it('should return a promise that resolves to generated text by image from OpenAI', async () => {
  //   const file = new File([], 'image.png');
  //   const promptText = 'Describe the image';
  //   const response = 'Generated text from image';
  //   (openaiService.generateTextByImage as jest.Mock).mockResolvedValue(response);

  //   const result = await service.generateTextByImage(file, promptText);

  //   expect(openaiService.generateTextByImage).toHaveBeenCalledWith(file, promptText);
  //   expect(result).toBe(response);
  // });

  it('should return a promise that resolves to generated text by image from Gemini', async () => {
    fbSharedService.flexbotCurrentImageModel = FlexbotCurrentImageModel.GOOGLE_GEMINI_1_5_FLASH;
    const file = new File([], 'image.png');
    const promptText = 'Describe the image';
    const response = 'Generated text from image';
    (geminiService.generateTextByImage as jest.Mock).mockResolvedValue(response);

    const result = await service.generateTextByImage(file, promptText);

    expect(geminiService.generateTextByImage).toHaveBeenCalledWith(file, promptText);
    expect(result).toBe(response);
  });

  it('should generate text stream using OpenAI', async () => {
    const prompt = 'Hello, world!';
    const response = 'Streaming text';
    (openaiService.generateTextStream as jest.Mock).mockResolvedValue(response);

    const result = await service.generateTextStream(prompt);

    expect(openaiService.generateTextStream).toHaveBeenCalledWith(prompt);
    expect(result).toBe(response);
  });

  it('should generate text stream using Gemini', async () => {
    fbSharedService.flexbotCurrentTextModel = FlexbotCurrentTextModel.GOOGLE_GEMINI_PRO;
    const prompt = 'Hello, world!';
    const response = 'Streaming text';
    (geminiService.geminiProStreaming as jest.Mock).mockResolvedValue(response);

    const result = await service.generateTextStream(prompt);

    expect(geminiService.geminiProStreaming).toHaveBeenCalledWith(prompt);
    expect(result).toBe(response);
  });
});