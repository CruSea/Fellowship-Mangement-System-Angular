import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGraduatesGroupsModalComponent } from './post-graduates-groups-modal.component';

describe('PostGraduatesGroupsModalComponent', () => {
  let component: PostGraduatesGroupsModalComponent;
  let fixture: ComponentFixture<PostGraduatesGroupsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGraduatesGroupsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGraduatesGroupsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
