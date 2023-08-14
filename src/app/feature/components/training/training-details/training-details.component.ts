import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Exercise } from 'src/app/feature/models/exercises.model';
import { Training } from 'src/app/feature/models/training.model';
import { ExerciseToTrainingService } from 'src/app/feature/services/exerciseToTraining.service';
import { TrainingService } from 'src/app/feature/services/training.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.css']
})
export class TrainingDetailsComponent {
  training: Training;
  id: string;
  isClicked: boolean = false;
  exerciseList: Exercise[] = []
  listCounter: string = '0';

  constructor(private trainingService: TrainingService,
              private route: ActivatedRoute,
              private router: Router,
              private exerciseToTrainingService: ExerciseToTrainingService,
              private snackBar: MatSnackBar,
              private zone: NgZone,
              ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.training = this.trainingService.getTraining(this.id);

          if(params['id'] != null && params['id']!='training'){
            this.isClicked = true
          }else{
            this.isClicked = false
          }
        }
      );
      if(this.training.exercises){
        this.exerciseList = this.training.exercises
      }else{
        this.training.exercises = []
      }
  }

  onEditTraining() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteTraining() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id
          this.trainingService.deleteTraining(this.id);
          this.router.navigate(['/training']);
        }
      )
      this.zone.run(() => {
        this.snackBar.open('Successful deleted the training','',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass:['success']
      })
    });

  }

  addExercise(){
    if(this.exerciseToTrainingService.pushToTraining()){
      this.training.exercises.push(this.exerciseToTrainingService.pushToTraining())
      this.zone.run(() => {
        this.snackBar.open('Successful added exercise','',{
        duration: 2000,
        verticalPosition: 'top',
        panelClass:['success']
      })
    });
    }
    if(this.training.exercises.length === 0){
      this.listCounter+1;
    }else{
      this.listCounter = String(this.training.exercises.length-1)
    }
    
  }

  deleteExercise(id:string){
    this.zone.run(() => {
      this.snackBar.open('Successful deleted the exercise','',{
      duration: 2000,
      verticalPosition: 'top',
      panelClass:['success']
    })
  });
    this.exerciseList.every((element,index)=>{
      if(element.id === id){
        this.exerciseList.splice(index,1)
        return false && this.exerciseList
      }else{
        return true && this.exerciseList
      }
    })
  }
  redirectDetailsExercise(id:string){
    if(id === undefined){
      this.zone.run(() => {
        this.snackBar.open('Something went wrong','',{
          duration: 4000,
          verticalPosition: 'top',
          panelClass:['warning']
        })
    });
    }else{
      this.router.navigateByUrl("/exercises/"+id);
    }
    
  }
}