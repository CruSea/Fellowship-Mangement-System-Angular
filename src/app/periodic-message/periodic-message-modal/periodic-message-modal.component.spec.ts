import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicMessageModalComponent } from './periodic-message-modal.component';

describe('PeriodicMessageModalComponent', () => {
  let component: PeriodicMessageModalComponent;
  let fixture: ComponentFixture<PeriodicMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
