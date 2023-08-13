import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Exercise } from 'src/app/feature/models/exercises.model';
import { Training } from 'src/app/feature/models/training.model';
import { ExerciseToTrainingService } from 'src/app/feature/services/exerciseToTraining.service';
import { TrainingService } from 'src/app/feature/services/training.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';


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
              private dataStorageService:DataStorageService,
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

  }

  addExercise(){
    if(this.exerciseToTrainingService.pushToTraining()){
      this.training.exercises.push(this.exerciseToTrainingService.pushToTraining())
    }
    if(this.training.exercises.length === 0){
      this.listCounter+1;
    }else{
      this.listCounter = String(this.training.exercises.length-1)
    }
    
  }

  deleteExercise(id:string){
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
      //TODO add snackbar
    }else{
      this.router.navigateByUrl("/exercises/"+id);
    }
    
  }
}