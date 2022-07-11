import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossaryDetailsComponent } from './grossary-details.component';

describe('GrossaryDetailsComponent', () => {
  let component: GrossaryDetailsComponent;
  let fixture: ComponentFixture<GrossaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrossaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrossaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
