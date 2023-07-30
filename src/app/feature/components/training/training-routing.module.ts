import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TrainingEditComponent } from "./training-edit/training-edit.component";
import { TrainingComponent } from "./training.component";
import { TrainingDetailsComponent } from "./training-details/training-details.component";
import { TrainingResolverService } from "../../services/trainings-resolver.service";


const routes: Routes = [
    {
        path: '',
        component: TrainingComponent,
        children: [
          { path: 'new', component: TrainingEditComponent},
          {
            path: ':id',
            component: TrainingDetailsComponent,
            resolve: [TrainingResolverService]
          },
          {
            path: ':id/edit',
            component: TrainingEditComponent,
            resolve: [TrainingResolverService]
          }
        ]
      }

 ]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TrainingRoutingModule{}