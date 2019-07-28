import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicMessageEventModalComponent } from './periodic-message-event-modal.component';

describe('PeriodicMessageEventModalComponent', () => {
  let component: PeriodicMessageEventModalComponent;
  let fixture: ComponentFixture<PeriodicMessageEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicMessageEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicMessageEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
