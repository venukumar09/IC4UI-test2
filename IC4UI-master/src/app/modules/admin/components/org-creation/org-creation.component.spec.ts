import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCreationComponent } from './org-creation.component';

describe('OrgCreationComponent', () => {
  let component: OrgCreationComponent;
  let fixture: ComponentFixture<OrgCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
