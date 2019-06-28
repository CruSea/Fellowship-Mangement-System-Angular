import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedContactsComponent } from './grouped-contacts.component';

describe('GroupedContactsComponent', () => {
  let component: GroupedContactsComponent;
  let fixture: ComponentFixture<GroupedContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
