import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCampaignsComponent } from './update-campaigns.component';

describe('UpdateCampaignsComponent', () => {
  let component: UpdateCampaignsComponent;
  let fixture: ComponentFixture<UpdateCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
