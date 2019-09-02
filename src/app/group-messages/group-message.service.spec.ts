import { TestBed, inject } from '@angular/core/testing';

import { GroupMessageService } from './group-message.service';

describe('GroupMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupMessageService]
    });
  });

  it('should be created', inject([GroupMessageService], (service: GroupMessageService) => {
    expect(service).toBeTruthy();
  }));
});
