import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationMessageGroupModalComponent } from './registration-message-group-modal.component';

describe('RegistrationMessageGroupModalComponent', () => {
  let component: RegistrationMessageGroupModalComponent;
  let fixture: ComponentFixture<RegistrationMessageGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationMessageGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationMessageGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
