import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ExerciseService } from 'src/app/feature/services/exercises.service';
import { Exercise } from 'src/app/feature/models/exercises.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {
  id: string;
  editMode = false;
  exerciseForm: FormGroup;
  exercise: Exercise;
  exerciseList: Exercise[] = [];

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    this.initForm()
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.exerciseService.updateExercise(this.id, this.exerciseForm.value);
      this.zone.run(() => {
        this.snackBar.open('Successful updated the exercise','',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass:['success']
      })
    });
    } else {
      this.exerciseService.addExercise(this.exerciseForm.value);
      this.zone.run(() => {
        this.snackBar.open('Successful added a new exercise','',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass:['success']
      })
    });
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  patchExerciseValues(){
    const exercise = this.exerciseService.getExercise(this.id);      
    this.exerciseForm.controls['exerciseName'].patchValue(
      exercise.exerciseName
    )
    this.exerciseForm.controls['exerciseDescription'].patchValue(
      exercise.exerciseDescription
    )
    this.exerciseForm.controls['exerciseImage'].patchValue(
      exercise.exerciseImage
    )
    this.exerciseForm.controls['exerciseVideo'].patchValue(
      exercise.exerciseVideo
    )
}

  initForm() {
    this.exerciseForm = this.fb.group({
      exerciseName: ['', Validators.required],
      exerciseVideo: ['', Validators.required],
      exerciseImage: ['', Validators.required],
      exerciseDescription: ['', Validators.required] 
    });
  }
}
