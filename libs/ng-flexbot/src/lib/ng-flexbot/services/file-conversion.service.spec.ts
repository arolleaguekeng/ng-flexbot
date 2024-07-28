import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FileConversionService } from './file-conversion.service';

describe('FileConversionService', () => {
  let service: FileConversionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileConversionService],
    });

    service = TestBed.inject(FileConversionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert file to Base64', async () => {
    jest.setTimeout(10000); // Increase the timeout to 10 seconds

    const filePath = 'assets/sample.txt';
    const mockBlob = new Blob(['Hello, world!'], { type: 'text/plain' });
    const expectedBase64 = 'SGVsbG8sIHdvcmxkIQ=='; // Base64 encoding of 'Hello, world!'

    const resultPromise = service.convertToBase64(filePath);

    const req = httpTestingController.expectOne(filePath);
    expect(req.request.method).toBe('GET');
    req.flush(mockBlob); // Return the mock blob

    const result = await resultPromise;

    expect(result).toBe(expectedBase64);
  });
});
