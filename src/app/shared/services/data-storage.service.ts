import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';


import { AuthService } from '../../core/services/auth.service';
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
        duration: 3000,
        verticalPosition: 'top',
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
        duration: 3000,
        verticalPosition: 'top',
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
          for(var e in exercises){          
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
            duration: 3000,
            verticalPosition: 'top',
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
            duration: 3000,
            verticalPosition: 'top',
          })
        });
        })
      );
  }
}
