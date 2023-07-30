import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { TrainingService } from './training.service';
import { Training } from '../models/training.model';

@Injectable({ providedIn: 'root' })
export class TrainingResolverService implements Resolve<Training[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private trainingService: TrainingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const trainings = this.trainingService.getTrainings();

    if (trainings.length === 0) {
      return this.dataStorageService.fetchTrainings();
    } else {
      return trainings;
    }
  }
}
