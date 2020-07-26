import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ["./tasks-create.component.css"]
})

export class TaskCreateComponent implements OnInit  {
  form: FormGroup;
  constructor(public tasksService: TasksService) { }

   ngOnInit() {
     this.form = new FormGroup({

      title: new FormControl(null, {
           validators: [Validators.required, Validators.minLength(3)]
         }),

         description: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
         })
       })
   }

   onSaveTask(){
     if(this.form.invalid) {
       return;
     }
     this.tasksService.addTask(
       this.form.value.title,
       this.form.value.description
     );
     console.log(this.form.value.title, this .form.value.description);
   }
}
