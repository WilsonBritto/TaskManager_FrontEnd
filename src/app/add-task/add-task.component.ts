import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../Services/Data/Task/task.service';
import { Task } from '../Shared/Models/task';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  Priority: number;
  UsrFrm: FormGroup;
  tasks: Task[];
  constructor(private nav: NavBarService, private fb: FormBuilder, private taskService: TaskService) {
    this.Priority = 0;
    this.UsrFrm = fb.group({
      taskDetails: ['', [Validators.required]],
      priority: [],
      parentId: [],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  get TaskCtrl() {
    return this.UsrFrm.get('taskDetails');
  }
  get PriorityCtrl() {
    return this.UsrFrm.get('priority');
  }
  get ParentTaskCtrl() {
    return this.UsrFrm.get('parentId');
  }
  get StartDateCtrl() {
    return this.UsrFrm.get('startDate');
  }
  get EndDateCtrl() {
    return this.UsrFrm.get('endDate');
  }


  onSubmit({ value, root }: { value: Task, root: FormGroup }): void {
    this.taskService.create(value)
      .pipe(
        switchMap(data => {
          alert("Task " + data.taskDetails + "is created with id = " + data.taskId);
          return this.taskService.getAll();
        })
      ).subscribe(data => {
        this.tasks = data;
      })

    this.UsrFrm.reset();
  }

  ngOnInit() {
    this.nav.show();
    this.PriorityCtrl.valueChanges.subscribe(d => this.Priority = d);

    this.taskService.getAll().subscribe(data => {
      this.tasks = data;
    });

  }

}
