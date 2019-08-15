import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMessageContactModalComponent } from './scheduled-message-contact-modal.component';

describe('ScheduledMessageContactModalComponent', () => {
  let component: ScheduledMessageContactModalComponent;
  let fixture: ComponentFixture<ScheduledMessageContactModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledMessageContactModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledMessageContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
