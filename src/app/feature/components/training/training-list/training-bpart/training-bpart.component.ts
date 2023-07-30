import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Training } from 'src/app/feature/models/training.model';
import { TrainingService } from 'src/app/feature/services/training.service';

@Component({
  selector: 'app-training-bpart',
  templateUrl: './training-bpart.component.html',
  styleUrls: ['./training-bpart.component.css']
})
export class TrainingBpartComponent implements OnInit {

  @Input() training: Training;
  @Input() index: number;

  trainings: Training[]

  constructor(
    private trainingService: TrainingService,
    private router: Router
    ){}

  ngOnInit(){
    this.trainingService.getTrainings()
  }
  redirectDetailsTraining(id){
    this.router.navigateByUrl("/training/"+id);
  }
}
