import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessagePostgraduatesContactModalComponent } from './group-message-postgraduates-contact-modal.component';

describe('GroupMessagePostgraduatesContactModalComponent', () => {
  let component: GroupMessagePostgraduatesContactModalComponent;
  let fixture: ComponentFixture<GroupMessagePostgraduatesContactModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMessagePostgraduatesContactModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMessagePostgraduatesContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
