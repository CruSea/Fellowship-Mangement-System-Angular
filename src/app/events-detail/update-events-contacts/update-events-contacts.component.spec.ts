import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventsContactsComponent } from './update-events-contacts.component';

describe('UpdateEventsContactsComponent', () => {
  let component: UpdateEventsContactsComponent;
  let fixture: ComponentFixture<UpdateEventsContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEventsContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEventsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
