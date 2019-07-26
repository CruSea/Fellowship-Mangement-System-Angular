import { TestBed, inject } from '@angular/core/testing';

import { PostGraduatesGroupsService } from './post-graduates-groups.service';

describe('PostGraduatesGroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostGraduatesGroupsService]
    });
  });

  it('should be created', inject([PostGraduatesGroupsService], (service: PostGraduatesGroupsService) => {
    expect(service).toBeTruthy();
  }));
});
