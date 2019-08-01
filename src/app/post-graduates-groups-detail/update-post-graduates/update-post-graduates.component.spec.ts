import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostGraduatesComponent } from './update-post-graduates.component';

describe('UpdatePostGraduatesComponent', () => {
  let component: UpdatePostGraduatesComponent;
  let fixture: ComponentFixture<UpdatePostGraduatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePostGraduatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePostGraduatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
