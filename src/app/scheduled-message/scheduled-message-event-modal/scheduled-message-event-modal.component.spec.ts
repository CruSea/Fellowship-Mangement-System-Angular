import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMessageEventModalComponent } from './scheduled-message-event-modal.component';

describe('ScheduledMessageEventModalComponent', () => {
  let component: ScheduledMessageEventModalComponent;
  let fixture: ComponentFixture<ScheduledMessageEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledMessageEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledMessageEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
