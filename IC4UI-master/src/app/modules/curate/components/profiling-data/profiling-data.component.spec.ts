import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilingDataComponent } from './profiling-data.component';

describe('ProfilingDataComponent', () => {
  let component: ProfilingDataComponent;
  let fixture: ComponentFixture<ProfilingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
