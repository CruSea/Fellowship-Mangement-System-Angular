import { TestBed, inject } from '@angular/core/testing';

import { GroupedMessageService } from './grouped-message.service';

describe('GroupedMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupedMessageService]
    });
  });

  it('should be created', inject([GroupedMessageService], (service: GroupedMessageService) => {
    expect(service).toBeTruthy();
  }));
});
