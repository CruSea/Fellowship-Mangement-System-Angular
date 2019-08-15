import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessageEventModalComponent } from './group-message-event-modal.component';

describe('GroupMessageEventModalComponent', () => {
  let component: GroupMessageEventModalComponent;
  let fixture: ComponentFixture<GroupMessageEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMessageEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMessageEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
