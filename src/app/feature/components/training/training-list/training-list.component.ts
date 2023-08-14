import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Training } from 'src/app/feature/models/training.model';
import { TrainingService } from 'src/app/feature/services/training.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  trainings: Training[];
  subscription: Subscription;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private trainingService:TrainingService) {
  }

  ngOnInit() {
    this.subscription = this.trainingService.trainingChanged
    .subscribe(
      (trainings: Training[]) => {
        this.trainings = trainings;
      }
    );
  this.trainings = this.trainingService.getTrainings();
  }

  onNewTraining() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
