import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicMessageContactsModalComponent } from './periodic-message-contacts-modal.component';

describe('PeriodicMessageContactsModalComponent', () => {
  let component: PeriodicMessageContactsModalComponent;
  let fixture: ComponentFixture<PeriodicMessageContactsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicMessageContactsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicMessageContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
