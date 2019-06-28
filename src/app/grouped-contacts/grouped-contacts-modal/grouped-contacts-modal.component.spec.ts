import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedContactsModalComponent } from './grouped-contacts-modal.component';

describe('GroupedContactsModalComponent', () => {
  let component: GroupedContactsModalComponent;
  let fixture: ComponentFixture<GroupedContactsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedContactsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
