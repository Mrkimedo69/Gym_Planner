import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Exercise } from 'src/app/feature/models/exercises.model';
import { ExerciseService } from 'src/app/feature/services/exercises.service';
import { TrainingService } from 'src/app/feature/services/training.service';
import { Training } from 'src/app/feature/models/training.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private exerciseService: ExerciseService,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
  ) {}

  storeExercises() {
    let exercises = this.exerciseService.getExercises();
    if(exercises.length != 0){
    this.http
      .put(
        'https://gym-planner-34d64-default-rtdb.europe-west1.firebasedatabase.app/exerciseList.json',
        exercises
      ).subscribe()
      this.zone.run(() => {
        this.snackBar.open('Successful stored all exercises','',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass:['success']
      })
    });
    exercises = []
      }
  }
  storeTrainings() {
    let trainings = this.trainingService.getTrainings();
    if(trainings.length !=0){
    this.http
      .put(
        'https://gym-planner-34d64-default-rtdb.europe-west1.firebasedatabase.app/trainingList.json',
        trainings
      ).subscribe()
      this.zone.run(() => {
        this.snackBar.open('Successful stored all trainings','',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass:['success']
      })
    });
      trainings =[]
    }
  }

  fetchExercises() {
    return this.http
      .get<Exercise[]>(
        'https://gym-planner-34d64-default-rtdb.europe-west1.firebasedatabase.app/exerciseList.json'
      )
      .pipe(
        map(exercises => {
          for(let e in exercises){          
            exercises[e].id = e
          }
          return exercises.map(exercise => {
            return {
              ...exercise          
            };
          });
        }),
        tap(exercises => {
          this.exerciseService.setExercises(exercises);
          this.zone.run(() => {
            this.snackBar.open('Successful fetched all exercises','',{
            duration: 2000,
            verticalPosition: 'top',
            panelClass:['success']
          })
        });
        })
      );
  }
    fetchTrainings() {
    return this.http
      .get<Training[]>(
        'https://gym-planner-34d64-default-rtdb.europe-west1.firebasedatabase.app/trainingList.json'
      )
      .pipe(
        map(trainings => {
          return trainings?.map(training => {
            return {
              ...training           
            };
          });
        }),
        tap(trainings => {
          this.trainingService.setTrainings(trainings);
          this.zone.run(() => {
            this.snackBar.open('Successful fetched all trainings','',{
            duration: 2000,
            verticalPosition: 'top',
            panelClass:['success']
          })
        });
        })
      );
  }
}
