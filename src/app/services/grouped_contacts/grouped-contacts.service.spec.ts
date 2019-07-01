import { TestBed, inject } from '@angular/core/testing';

import { GroupedContactsService } from './grouped-contacts.service';

describe('GroupedContactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupedContactsService]
    });
  });

  it('should be created', inject([GroupedContactsService], (service: GroupedContactsService) => {
    expect(service).toBeTruthy();
  }));
});
