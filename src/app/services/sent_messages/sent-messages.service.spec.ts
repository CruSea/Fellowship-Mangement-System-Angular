import { TestBed, inject } from '@angular/core/testing';

import { SentMessagesService } from './sent-messages.service';

describe('SentMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentMessagesService]
    });
  });

  it('should be created', inject([SentMessagesService], (service: SentMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
