import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMessageContactModalComponent } from './registration-message-contact-modal.component';

describe('RegistrationMessageContactModalComponent', () => {
  let component: RegistrationMessageContactModalComponent;
  let fixture: ComponentFixture<RegistrationMessageContactModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationMessageContactModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMessageContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
