import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Exercise } from 'src/app/feature/models/exercises.model';
import { ExerciseService } from 'src/app/feature/services/exercises.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  subscription: Subscription;

  constructor(private exerciseService: ExerciseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.exerciseService.exerciseChanged
      .subscribe(
        (exercises: Exercise[]) => {
          this.exercises = exercises;
        }
      );
    this.exercises = this.exerciseService.getExercises();
  }

  onNewExercise() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
