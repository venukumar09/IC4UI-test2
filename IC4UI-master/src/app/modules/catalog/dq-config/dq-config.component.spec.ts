import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DqConfigComponent } from './dq-config.component';

describe('DqConfigComponent', () => {
  let component: DqConfigComponent;
  let fixture: ComponentFixture<DqConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DqConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DqConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
