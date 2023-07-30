import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingBpartComponent } from './training-bpart.component';

describe('TrainingBpartComponent', () => {
  let component: TrainingBpartComponent;
  let fixture: ComponentFixture<TrainingBpartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingBpartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingBpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
