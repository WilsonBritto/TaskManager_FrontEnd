import { ViewTask } from './../Shared/Models/view-task';
import { TaskService } from './../Services/Data/Task/task.service';
import { Task } from './../Shared/Models/task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  UsrFrm: FormGroup;
  tasks: Task[];
  viewTasks: ViewTask[] = [];
  constructor(private nav: NavBarService, private router: Router, private fb: FormBuilder, private taskService: TaskService) {
    this.UsrFrm = fb.group({
      searchGroup: fb.group({
        taskDetails: [],
        parentTaskDetails: [],
        priorityFrom: [],
        priorityTo: [],
        startDate: [],
        endDate: []
      }),
      displayGroup: fb.group({
        taskDetails: [],
        parentTaskDetails: [],
        priority: [],
        startDate: [],
        endDate: []
      })
    })
  }

  onEdit() {
    this.router.navigate(['/UpdateTask']);
  }

  ngOnInit() {
    this.nav.show();
    this.taskService.getAll()
      .subscribe(data => {
        this.tasks = data;
        data.forEach(o => {
          let vT = o as ViewTask;
          if (vT.parentId)
            vT.parentTaskDetails = this.tasks.find(t => t.taskId == vT.parentId).taskDetails;
          else
            vT.parentTaskDetails = "This task doen not have any parent"
          this.viewTasks.push(vT);
        });
      });
  }

}
