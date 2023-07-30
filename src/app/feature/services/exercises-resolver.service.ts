import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { ExerciseService } from './exercises.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { Exercise } from '../models/exercises.model';

@Injectable({ providedIn: 'root' })
export class ExerciseResolverService implements Resolve<Exercise[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private exerciseService: ExerciseService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const exercises = this.exerciseService.getExercises();

    if (exercises.length === 0) {
      return this.dataStorageService.fetchExercises();
    } else {
      return exercises;
    }
  }
}
