import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from '../../services/training.service';
import { LoggingService } from 'src/app/core/services/logging.service';
import { Training } from '../../models/training.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  training: Training[];
  private subscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.training = this.trainingService.getTrainings();
    this.subscription = this.trainingService.trainingChanged.subscribe(
      (training: Training[]) => {
        this.training = training;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
