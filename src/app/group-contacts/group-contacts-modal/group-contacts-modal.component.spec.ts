import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupContactsModalComponent } from './group-contacts-modal.component';

describe('GroupContactsModalComponent', () => {
  let component: GroupContactsModalComponent;
  let fixture: ComponentFixture<GroupContactsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupContactsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
