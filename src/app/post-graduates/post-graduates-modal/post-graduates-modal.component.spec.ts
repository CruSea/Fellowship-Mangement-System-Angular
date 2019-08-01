import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGraduatesModalComponent } from './post-graduates-modal.component';

describe('PostGraduatesModalComponent', () => {
  let component: PostGraduatesModalComponent;
  let fixture: ComponentFixture<PostGraduatesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGraduatesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGraduatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
