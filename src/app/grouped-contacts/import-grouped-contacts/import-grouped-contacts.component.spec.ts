import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGroupedContactsComponent } from './import-grouped-contacts.component';

describe('ImportGroupedContactsComponent', () => {
  let component: ImportGroupedContactsComponent;
  let fixture: ComponentFixture<ImportGroupedContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportGroupedContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGroupedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
