import { TestBed, inject } from '@angular/core/testing';

import { RegistrationKeyService } from './registration-key.service';

describe('RegistrationKeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationKeyService]
    });
  });

  it('should be created', inject([RegistrationKeyService], (service: RegistrationKeyService) => {
    expect(service).toBeTruthy();
  }));
});
