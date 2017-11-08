import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeQuantumComponent } from './time-quantum.component';

describe('TimeQuantumComponent', () => {
  let component: TimeQuantumComponent;
  let fixture: ComponentFixture<TimeQuantumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeQuantumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeQuantumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
