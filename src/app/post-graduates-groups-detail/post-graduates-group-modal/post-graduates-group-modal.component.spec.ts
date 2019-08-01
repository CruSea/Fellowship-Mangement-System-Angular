import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGraduatesGroupModalComponent } from './post-graduates-group-modal.component';

describe('PostGraduatesGroupModalComponent', () => {
  let component: PostGraduatesGroupModalComponent;
  let fixture: ComponentFixture<PostGraduatesGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGraduatesGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGraduatesGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
