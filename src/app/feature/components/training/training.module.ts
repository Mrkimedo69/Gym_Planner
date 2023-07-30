import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TrainingComponent } from './training.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { TrainingBpartComponent } from './training-list/training-bpart/training-bpart.component';
import { TrainingListComponent } from './training-list/training-list.component';


@NgModule({
  declarations: [
    TrainingComponent, 
    TrainingEditComponent,
    TrainingListComponent,
    TrainingBpartComponent,
    TrainingDetailsComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: TrainingComponent }]),
    SharedModule,
    TrainingRoutingModule,
    ReactiveFormsModule
  ],
})
export class TrainingModule {}
