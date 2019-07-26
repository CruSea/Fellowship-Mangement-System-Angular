import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledMessageComponent } from './scheduled-message.component';

describe('ScheduledMessageComponent', () => {
  let component: ScheduledMessageComponent;
  let fixture: ComponentFixture<ScheduledMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
