import { TestBed, inject } from '@angular/core/testing';

import { ReceivedMessagesService } from './received-messages.service';

describe('ReceivedMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceivedMessagesService]
    });
  });

  it('should be created', inject([ReceivedMessagesService], (service: ReceivedMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
