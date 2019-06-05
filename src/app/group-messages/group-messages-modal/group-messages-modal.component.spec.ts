import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessagesModalComponent } from './group-messages-modal.component';

describe('GroupMessagesModalComponent', () => {
  let component: GroupMessagesModalComponent;
  let fixture: ComponentFixture<GroupMessagesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMessagesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMessagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
