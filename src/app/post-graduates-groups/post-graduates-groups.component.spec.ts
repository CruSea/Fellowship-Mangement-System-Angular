import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGraduatesGroupsComponent } from './post-graduates-groups.component';

describe('PostGraduatesGroupsComponent', () => {
  let component: PostGraduatesGroupsComponent;
  let fixture: ComponentFixture<PostGraduatesGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGraduatesGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGraduatesGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
