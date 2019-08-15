import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationMessageComponent } from './registeration-message.component';

describe('RegisterationMessageComponent', () => {
  let component: RegisterationMessageComponent;
  let fixture: ComponentFixture<RegisterationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
