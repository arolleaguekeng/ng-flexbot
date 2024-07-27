import { TestBed } from '@angular/core/testing';
import { GeminiServiceService } from './gemini-service.service';
import { FileConversionService } from '../file-conversion.service';
import { FbSharedServiceService } from '../fb-shared-service.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HttpClient } from '@angular/common/http';
import { FlexbotCurrentImageModel, FlexbotCurrentTextModel } from '../../models/flexbot-current-llm.enum';

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
            flexbotCurrentImageModel: FlexbotCurrentImageModel.GOOGLE_GEMINI_1_5_FLASH,
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

  it('should generate text based on prompt', async () => {
    const prompt = 'Hello, world!';
    const mockChatModel = {
      startChat: jest.fn().mockReturnValue({
        sendMessage: jest.fn().mockResolvedValue({ text: 'Generated text' }),
      }),
    };

    mockGoogleGenerativeAI.getGenerativeModel.mockReturnValue(mockChatModel);

    const result = await service.generateText(prompt);
    
    expect(result.text).toBe('Generated text');
    expect(fbSharedService.chatHistory).toContainEqual({
      role: 'user',
      parts: [{ text: prompt }],
    });
  });

  it('should generate text based on image and prompt', async () => {
    const mockFile = new Blob(['image content'], { type: 'image/jpeg' }) as File;
    const promptText = 'Describe the image.';
    const mockBase64 = 'base64ImageData';
    const mockImageModel = {
      generateContent: jest.fn().mockResolvedValue({
        response: { text: jest.fn().mockResolvedValue('Generated text from image') },
      }),
    };

    (fileConversionService.convertToBase64 as jest.Mock).mockResolvedValue(mockBase64);
    mockGoogleGenerativeAI.getGenerativeModel.mockReturnValue(mockImageModel);

    const result = await service.generateTextByImage(mockFile, promptText);
    
    expect(result).toBe('Generated text from image');
    expect(fbSharedService.chatHistory).toContainEqual({
      role: 'user',
      parts: [{ text: promptText }],
    });
  });

  it('should handle errors when generating text from image', async () => {
    // Mock the global URL.createObjectURL function
    global.URL.createObjectURL = jest.fn().mockReturnValue('mocked-url');
  
    const mockFile = new Blob(['image content'], { type: 'image/jpeg' }) as File;
    const promptText = 'Describe the image.';
  
    // Mock the file conversion service to reject
    (fileConversionService.convertToBase64 as jest.Mock).mockRejectedValue(new Error('Conversion error'));
  
    const result = await service.generateTextByImage(mockFile, promptText);
    
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error converting file to Base64', expect.any(Error));
    afterAll(() => {
        // delete global.URL.createObjectURL;
      });
  });

  it('should stream text generation', async () => {
    const promptText = 'Stream this text.';
    const mockStreamResponse = {
      stream: {
        [Symbol.asyncIterator]: jest.fn().mockReturnValue({
          next: jest.fn().mockResolvedValue({ value: { text: jest.fn().mockReturnValue('streamed text') } }),
        }),
      },
      response: { text: jest.fn().mockResolvedValue('final response') },
    };

    const mockChatModel = {
      generateContentStream: jest.fn().mockResolvedValue(mockStreamResponse),
    };

    mockGoogleGenerativeAI.getGenerativeModel.mockReturnValue(mockChatModel);

    await service.geminiProStreaming(promptText);
    
    expect(fbSharedService.stramingResponse).toBe('streamed text');
    expect(console.log).toHaveBeenCalledWith('aggregated response: final response');
  });
});