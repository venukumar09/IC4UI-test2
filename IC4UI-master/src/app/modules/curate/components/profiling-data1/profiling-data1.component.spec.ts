import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingData1Component } from './profiling-data1.component';

describe('ProfilingData1Component', () => {
  let component: ProfilingData1Component;
  let fixture: ComponentFixture<ProfilingData1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilingData1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilingData1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
