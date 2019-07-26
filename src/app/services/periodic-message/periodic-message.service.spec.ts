import { TestBed, inject } from '@angular/core/testing';

import { PeriodicMessageService } from './periodic-message.service';

describe('PeriodicMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeriodicMessageService]
    });
  });

  it('should be created', inject([PeriodicMessageService], (service: PeriodicMessageService) => {
    expect(service).toBeTruthy();
  }));
});
