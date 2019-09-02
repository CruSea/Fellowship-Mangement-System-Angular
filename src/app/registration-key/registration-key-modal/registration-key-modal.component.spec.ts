import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationKeyModalComponent } from './registration-key-modal.component';

describe('RegistrationKeyModalComponent', () => {
  let component: RegistrationKeyModalComponent;
  let fixture: ComponentFixture<RegistrationKeyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationKeyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationKeyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
