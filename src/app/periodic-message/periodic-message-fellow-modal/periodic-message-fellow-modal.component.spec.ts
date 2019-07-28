import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicMessageFellowModalComponent } from './periodic-message-fellow-modal.component';

describe('PeriodicMessageFellowModalComponent', () => {
  let component: PeriodicMessageFellowModalComponent;
  let fixture: ComponentFixture<PeriodicMessageFellowModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicMessageFellowModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicMessageFellowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
