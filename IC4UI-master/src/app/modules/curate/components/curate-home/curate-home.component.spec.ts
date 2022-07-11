import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurateHomeComponent } from './curate-home.component';

describe('CurateHomeComponent', () => {
  let component: CurateHomeComponent;
  let fixture: ComponentFixture<CurateHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurateHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
