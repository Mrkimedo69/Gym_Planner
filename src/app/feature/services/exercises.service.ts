import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from '../models/exercises.model';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  exerciseChanged = new Subject<Exercise[]>();

  private exercise: Exercise[] = [];

  constructor() {}

  setExercises(exercises: Exercise[]) {
    this.exercise = exercises;
    this.exerciseChanged.next(this.exercise.slice());
  }

  getExercises() {
    return this.exercise.slice();
  }

  getExercise(index: string) {
    return this.exercise[index];
  }

  addExercise(exercise: Exercise) {
    this.exercise.push(exercise);
    this.exerciseChanged.next(this.exercise.slice());
  }

  updateExercise(index: string, newExercise: Exercise) {
    this.exercise[index] = newExercise;
    this.exerciseChanged.next(this.exercise.slice());
  }

  deleteExercise(index: string) {
    this.exercise.splice(+index, 1);
    this.exerciseChanged.next(this.exercise.slice());
  }
}
