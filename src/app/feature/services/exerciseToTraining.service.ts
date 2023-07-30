import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Exercise } from "../models/exercises.model";

@Injectable({ providedIn: 'root' })
export class ExerciseToTrainingService{

    private exercise: Exercise[] = [];

    exerciseChanged = new Subject<Exercise[]>();

    pullExercise(exercise: Exercise) {
        this.exercise.pop()
        this.exercise.push(exercise);
        this.exerciseChanged.next(this.exercise.slice());
      }
    
    pushToTraining(){
        return this.exercise[0]
    }

}