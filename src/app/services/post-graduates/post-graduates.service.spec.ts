import { TestBed, inject } from '@angular/core/testing';

import { PostGraduatesService } from './post-graduates.service';

describe('PostGraduatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostGraduatesService]
    });
  });

  it('should be created', inject([PostGraduatesService], (service: PostGraduatesService) => {
    expect(service).toBeTruthy();
  }));
});
