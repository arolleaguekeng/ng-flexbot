import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OpenaiServiceService } from './openai-service.service';
import { FbSharedServiceService } from '../fb-shared-service.service';
import { of } from 'rxjs';

describe('OpenaiServiceService', () => {
  let service: OpenaiServiceService;
  let httpMock: HttpTestingController;
  let fbSharedService: FbSharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OpenaiServiceService,
        {
          provide: FbSharedServiceService,
          useValue: {
            chatHistory: [],
            flexbotCurrentTextModel: 'text-davinci-003',
            flexbotCurrentImageModel: 'image-davinci-003',
            openaiApikey: 'mockApiKey',
          },
        },
      ],
    });

    service = TestBed.inject(OpenaiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    fbSharedService = TestBed.inject(FbSharedServiceService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate text based on the prompt', async () => {
    const prompt = 'Hello, world!';
    const mockResponse = { choices: [{ text: 'Generated text' }] };

    const resultPromise = service.generateText(prompt);

    const req = httpMock.expectOne(
      'https://api.openai.com/v1/chat/completions'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    const result = await resultPromise;

    expect(fbSharedService.chatHistory).toContainEqual({
      role: 'user',
      content: prompt,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle the error when generating text', async () => {
    const prompt = 'Hello, world!';

    const generateTextPromise = service.generateText(prompt);
    const req = httpMock.expectOne(
      'https://api.openai.com/v1/chat/completions'
    );
    req.error(new ErrorEvent('Network error'));

    const result = await generateTextPromise;

    expect(result).toBeUndefined(); // Adjust based on your error handling
    expect(console.error).toHaveBeenCalled();
  });

  //   it('should generate text by image and prompt', async () => {
  //     const mockFile = new Blob(['image content'], { type: 'image/jpeg' }) as File;
  //     const promptText = 'Describe the image.';
  //     const mockUploadResponse = { url: 'http://mock-image-url.com' };
  //     const mockResponse = { choices: [{ text: 'Generated text from image' }] };

  //     const uploadReq = httpMock.expectOne('https://api.openai.com/v1/files');
  //     uploadReq.flush(mockUploadResponse);

  //     const result = await service.generateTextByImage(mockFile, promptText);
  //     const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
  //     req.flush(mockResponse);

  //     expect(fbSharedService.chatHistory).toContainEqual({
  //       role: 'user',
  //       content: promptText,
  //       image_url: mockUploadResponse.url,
  //     });
  //     expect(result).toEqual(mockResponse);
  //   });

  //   it('should stream text generation', async () => {
  //     const prompt = 'Stream this text.';
  //     const mockResponse = { choices: [{ text: 'Streamed text' }] };

  //     const result = await service.generateTextStream(prompt);
  //     const req = httpMock.expectOne('https://api.openai.com/v1/chat/completions');
  //     req.flush(mockResponse);

  //     expect(fbSharedService.chatHistory).toContainEqual({
  //       role: 'user',
  //       content: prompt,
  //     });
  //     expect(result).toEqual(mockResponse);
  //   });
});
