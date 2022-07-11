import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurateScheduleComponent } from './curate-schedule.component';

describe('CurateScheduleComponent', () => {
  let component: CurateScheduleComponent;
  let fixture: ComponentFixture<CurateScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurateScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
