import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessageFellowshipModalComponent } from './group-message-fellowship-modal.component';

describe('GroupMessageFellowshipModalComponent', () => {
  let component: GroupMessageFellowshipModalComponent;
  let fixture: ComponentFixture<GroupMessageFellowshipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMessageFellowshipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMessageFellowshipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
