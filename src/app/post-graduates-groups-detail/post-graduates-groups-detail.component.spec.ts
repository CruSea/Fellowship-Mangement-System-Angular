import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGraduatesGroupsDetailComponent } from './post-graduates-groups-detail.component';

describe('PostGraduatesGroupsDetailComponent', () => {
  let component: PostGraduatesGroupsDetailComponent;
  let fixture: ComponentFixture<PostGraduatesGroupsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGraduatesGroupsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGraduatesGroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
