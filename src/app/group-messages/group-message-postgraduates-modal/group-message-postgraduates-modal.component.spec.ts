import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessagePostgraduatesModalComponent } from './group-message-postgraduates-modal.component';

describe('GroupMessagePostgraduatesModalComponent', () => {
  let component: GroupMessagePostgraduatesModalComponent;
  let fixture: ComponentFixture<GroupMessagePostgraduatesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMessagePostgraduatesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMessagePostgraduatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
