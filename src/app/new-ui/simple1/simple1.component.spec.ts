import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Simple1Component } from './simple1.component';

describe('Simple1Component', () => {
  let component: Simple1Component;
  let fixture: ComponentFixture<Simple1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Simple1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Simple1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
