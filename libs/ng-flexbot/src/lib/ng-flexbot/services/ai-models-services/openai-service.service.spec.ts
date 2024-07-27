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
});
