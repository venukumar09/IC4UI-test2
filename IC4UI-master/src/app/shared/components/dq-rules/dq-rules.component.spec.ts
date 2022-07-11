import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DqRulesComponent } from './dq-rules.component';

describe('DqRulesComponent', () => {
  let component: DqRulesComponent;
  let fixture: ComponentFixture<DqRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
