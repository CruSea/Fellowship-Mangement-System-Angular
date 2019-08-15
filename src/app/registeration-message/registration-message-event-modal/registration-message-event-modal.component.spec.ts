import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMessageEventModalComponent } from './registration-message-event-modal.component';

describe('RegistrationMessageEventModalComponent', () => {
  let component: RegistrationMessageEventModalComponent;
  let fixture: ComponentFixture<RegistrationMessageEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationMessageEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMessageEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
