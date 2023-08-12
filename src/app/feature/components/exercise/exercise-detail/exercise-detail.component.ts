import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Exercise } from 'src/app/feature/models/exercises.model';
import { ExerciseToTrainingService } from 'src/app/feature/services/exerciseToTraining.service';
import { ExerciseService } from 'src/app/feature/services/exercises.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit, AfterViewChecked {
  exercise: Exercise;
  id: string;
  videoId:string;
  ytLink:string;
  isClicked: boolean = false;

  constructor(private exerciseService: ExerciseService,
              private route: ActivatedRoute,
              private router: Router,
              private exerciseToTrainingService :ExerciseToTrainingService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.exercise = this.exerciseService.getExercise(this.id);
          if(params['id'] != null && params['id']!='exercises'){
            this.isClicked = true
          }else{
            this.isClicked = false
          }
        }
      );
      this.videoId = this.exercise.exerciseVideo.split('/watch?v=').pop();
      this.ytLink = 'https://www.youtube.com/embed/'+ this.videoId
      
  }
  ngAfterViewChecked(){
    this.videoId = this.exercise.exerciseVideo.split('/watch?v=').pop();
    this.ytLink = 'https://www.youtube.com/embed/' + this.videoId
    this.cdRef.detectChanges(); 
  }

  onAddTraining() {
    this.exerciseToTrainingService.pullExercise(this.exercise)
  }

  onEditExercise() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteExercise() {
    this.exerciseService.deleteExercise(this.id);
    this.router.navigate(['/exercises']);
  }

}
