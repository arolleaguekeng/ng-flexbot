import { TestBed } from '@angular/core/testing';

import { FlexbotService } from './flexbot.service';

describe('FlexbotService', () => {
  let service: FlexbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlexbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
