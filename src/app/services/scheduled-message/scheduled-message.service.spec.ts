import { TestBed, inject } from '@angular/core/testing';

import { ScheduledMessageService } from './scheduled-message.service';

describe('ScheduledMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduledMessageService]
    });
  });

  it('should be created', inject([ScheduledMessageService], (service: ScheduledMessageService) => {
    expect(service).toBeTruthy();
  }));
});
