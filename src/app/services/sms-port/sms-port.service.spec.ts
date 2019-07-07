import { TestBed, inject } from '@angular/core/testing';

import { SmsPortService } from './sms-port.service';

describe('SmsPortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsPortService]
    });
  });

  it('should be created', inject([SmsPortService], (service: SmsPortService) => {
    expect(service).toBeTruthy();
  }));
});
