import { TestBed, inject } from '@angular/core/testing';

import { GroupContactsService } from './group-contacts.service';

describe('GroupContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupContactsService]
    });
  });

  it('should be created', inject([GroupContactsService], (service: GroupContactsService) => {
    expect(service).toBeTruthy();
  }));
});
