import {
  Component,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TrainingService } from '../../../services/training.service';
import { Training } from 'src/app/feature/models/training.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {
  id: string;
  trainingForm: FormGroup;
  editMode = false;
  editedItemIndex: string;
  editedItem: Training;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private trainingService: TrainingService,private router: Router,) { }

  ngOnInit() {
    this.initForm()
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.trainingService.updateTraining(this.id, this.trainingForm.value);
    } else {
      this.trainingService.addTraining(this.trainingForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
    patchTrainingValues(){
    const training = this.trainingService.getTraining(this.id);      
    this.trainingForm.controls['trainingName'].patchValue(
      training.trainingName
    )
    this.trainingForm.controls['trainingImage'].patchValue(
      training.trainingImage
    )
    this.trainingForm.controls['trainingExercises'].patchValue(
      training.exercises
    )
}

  initForm() {
    this.trainingForm = this.fb.group({
      trainingName: ['', Validators.required],
      trainingImage: ['', Validators.required],
      exercises: [[]],
    });
  }

}
