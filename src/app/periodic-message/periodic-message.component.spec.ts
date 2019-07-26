import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicMessageComponent } from './periodic-message.component';

describe('PeriodicMessageComponent', () => {
  let component: PeriodicMessageComponent;
  let fixture: ComponentFixture<PeriodicMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
