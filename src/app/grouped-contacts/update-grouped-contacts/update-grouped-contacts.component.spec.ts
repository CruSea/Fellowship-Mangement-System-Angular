import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupedContactsComponent } from './update-grouped-contacts.component';

describe('UpdateGroupedContactsComponent', () => {
  let component: UpdateGroupedContactsComponent;
  let fixture: ComponentFixture<UpdateGroupedContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGroupedContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
