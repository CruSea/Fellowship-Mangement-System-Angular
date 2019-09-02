import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationKeyComponent } from './registration-key.component';

describe('RegistrationKeyComponent', () => {
  let component: RegistrationKeyComponent;
  let fixture: ComponentFixture<RegistrationKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
