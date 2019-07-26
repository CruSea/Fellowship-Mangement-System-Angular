import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupContactsComponent } from './update-group-contacts.component';

describe('UpdateGroupContactsComponent', () => {
  let component: UpdateGroupContactsComponent;
  let fixture: ComponentFixture<UpdateGroupContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGroupContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
