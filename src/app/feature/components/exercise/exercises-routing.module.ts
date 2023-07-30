import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisesComponent } from './exercises.component';
import { ExerciseStartComponent } from './exercise-start/exercise-start.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { AuthGuard } from 'src/app/core/components/auth/auth.guard';
import { ExerciseResolverService } from '../../services/exercises-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: ExercisesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ExerciseStartComponent },
      { path: 'new', component: ExerciseEditComponent },
      {
        path: ':id',
        component: ExerciseDetailComponent,
        resolve: [ExerciseResolverService]
      },
      {
        path: ':id/edit',
        component: ExerciseEditComponent,
        resolve: [ExerciseResolverService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule {}
