import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMessageFellowshipModalComponent } from './scheduled-message-fellowship-modal.component';

describe('ScheduledMessageFellowshipModalComponent', () => {
  let component: ScheduledMessageFellowshipModalComponent;
  let fixture: ComponentFixture<ScheduledMessageFellowshipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledMessageFellowshipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledMessageFellowshipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
