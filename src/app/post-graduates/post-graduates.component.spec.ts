import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGraduatesComponent } from './post-graduates.component';

describe('PostGraduatesComponent', () => {
  let component: PostGraduatesComponent;
  let fixture: ComponentFixture<PostGraduatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGraduatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGraduatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
