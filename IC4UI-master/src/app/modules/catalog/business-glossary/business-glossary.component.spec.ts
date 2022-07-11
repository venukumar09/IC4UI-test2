import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessGlossaryComponent } from './business-glossary.component';

describe('BusinessGlossaryComponent', () => {
  let component: BusinessGlossaryComponent;
  let fixture: ComponentFixture<BusinessGlossaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessGlossaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
