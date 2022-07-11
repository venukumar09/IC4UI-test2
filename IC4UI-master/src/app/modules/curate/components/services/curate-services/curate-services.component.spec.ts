import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurateServicesComponent } from './curate-services.component';

describe('CurateServicesComponent', () => {
  let component: CurateServicesComponent;
  let fixture: ComponentFixture<CurateServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurateServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurateServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
