import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMessageModalComponent } from './scheduled-message-modal.component';

describe('ScheduledMessageModalComponent', () => {
  let component: ScheduledMessageModalComponent;
  let fixture: ComponentFixture<ScheduledMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
