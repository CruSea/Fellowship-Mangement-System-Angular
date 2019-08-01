import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingPostGraduatesComponent } from './assing-post-graduates.component';

describe('AssingPostGraduatesComponent', () => {
  let component: AssingPostGraduatesComponent;
  let fixture: ComponentFixture<AssingPostGraduatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingPostGraduatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingPostGraduatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
