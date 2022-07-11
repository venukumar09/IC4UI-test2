import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobComponent } from './lob.component';

describe('LobComponent', () => {
  let component: LobComponent;
  let fixture: ComponentFixture<LobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
