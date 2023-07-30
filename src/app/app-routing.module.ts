import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/exercises", pathMatch: "full" },
  {path:'exercises', loadChildren: () => import('./feature/components/exercise/exercises.module').then(m => m.ExerciseModule)},
  {path:'training', loadChildren: () => import('./feature/components/training/training.module').then(m => m.TrainingModule)},
  {
    path: "auth",
    loadChildren: () => import("./core/components/auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
