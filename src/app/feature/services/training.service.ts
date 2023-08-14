import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from '../models/exercises.model';
import { Training } from '../models/training.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  trainingChanged = new Subject<Training[]>();

  private training: Training[] = [];

  constructor() {}

  setTrainings(trainings: Training[]) {
    this.training = trainings;
    this.trainingChanged.next(this.training?.slice());
  }

  getTrainings() {
    return this.training.slice();
  }

  getTraining(index: string) {
    return this.training[+index];
  }

  addTraining(training: Training) {
    this.training.push(training);
    this.trainingChanged.next(this.training.slice());
  }

  updateTraining(index: string, newTraining: Training) {
    this.training[+index] = newTraining;
    this.trainingChanged.next(this.training.slice());
  }

  deleteTraining(index: string) {
    this.training?.splice(+index, 1);
    this.trainingChanged?.next(this.training.slice());
  }
}
