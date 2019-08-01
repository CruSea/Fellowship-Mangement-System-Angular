import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsContactsModalComponent } from './events-contacts-modal.component';

describe('EventsContactsModalComponent', () => {
  let component: EventsContactsModalComponent;
  let fixture: ComponentFixture<EventsContactsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsContactsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
