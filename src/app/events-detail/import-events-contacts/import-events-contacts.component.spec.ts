import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEventsContactsComponent } from './import-events-contacts.component';

describe('ImportEventsContactsComponent', () => {
  let component: ImportEventsContactsComponent;
  let fixture: ComponentFixture<ImportEventsContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEventsContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEventsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
