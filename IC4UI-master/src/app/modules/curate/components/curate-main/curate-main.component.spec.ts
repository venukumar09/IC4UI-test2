import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurateMainComponent } from './curate-main.component';

describe('CurateMainComponent', () => {
  let component: CurateMainComponent;
  let fixture: ComponentFixture<CurateMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurateMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
