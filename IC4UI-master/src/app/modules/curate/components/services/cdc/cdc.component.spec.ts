import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdcComponent } from './cdc.component';

describe('CdcComponent', () => {
  let component: CdcComponent;
  let fixture: ComponentFixture<CdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
