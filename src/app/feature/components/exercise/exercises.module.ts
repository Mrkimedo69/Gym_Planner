import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

import { ExercisesComponent } from './exercises.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ExerciseItemComponent } from './exercise-list/exercise-item/exercise-item.component';
import {ExerciseStartComponent } from './exercise-start/exercise-start.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseRoutingModule } from './exercises-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ExercisesComponent,
    ExerciseListComponent,
    ExerciseDetailComponent,
    ExerciseItemComponent,
    ExerciseStartComponent,
    ExerciseEditComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ExerciseRoutingModule,
    SharedModule,
    CommonModule,
  ]
})
export class ExerciseModule {}
