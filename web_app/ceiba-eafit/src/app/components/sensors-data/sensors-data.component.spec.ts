import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsDataComponent } from './sensors-data.component';

describe('SensorsDataComponent', () => {
  let component: SensorsDataComponent;
  let fixture: ComponentFixture<SensorsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
