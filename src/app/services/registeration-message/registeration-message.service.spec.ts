import { TestBed, inject } from '@angular/core/testing';

import { RegisterationMessageService } from './registeration-message.service';

describe('RegisterationMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterationMessageService]
    });
  });

  it('should be created', inject([RegisterationMessageService], (service: RegisterationMessageService) => {
    expect(service).toBeTruthy();
  }));
});
