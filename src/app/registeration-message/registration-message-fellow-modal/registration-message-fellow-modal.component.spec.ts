import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMessageFellowModalComponent } from './registration-message-fellow-modal.component';

describe('RegistrationMessageFellowModalComponent', () => {
  let component: RegistrationMessageFellowModalComponent;
  let fixture: ComponentFixture<RegistrationMessageFellowModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationMessageFellowModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMessageFellowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
