import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../Services/Data/Task/task.service';
import { Task } from '../Shared/Models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  Priority: number;
  UsrFrm: FormGroup;
  tasks: Task[];
  constructor(private nav: NavBarService, private fb: FormBuilder, private taskService: TaskService) {
    this.Priority = 0;
    this.UsrFrm = fb.group({
      Task: ['', [Validators.required]],
      Priority: [],
      ParentTask: [],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
    });
  }

  get TaskCtrl() {
    return this.UsrFrm.get('Task');
  }
  get PriorityCtrl() {
    return this.UsrFrm.get('Priority');
  }
  get ParentTaskCtrl() {
    return this.UsrFrm.get('ParentTask');
  }
  get StartDateCtrl() {
    return this.UsrFrm.get('StartDate');
  }
  get EndDateCtrl() {
    return this.UsrFrm.get('EndDate');
  }


  onSubmit(): void {

  }

  ngOnInit() {
    this.nav.show();
    this.PriorityCtrl.valueChanges.subscribe(d => this.Priority = d);

    this.taskService.getAll().subscribe(data => {
      this.tasks = data;
    });
  }

}
