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
  filteredTasks: ViewTask[];
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

  filterTasks() {
    this.filteredTasks = this.viewTasks.filter(task => {
      return (task.taskDetails.toLowerCase().indexOf(this.sgTaskDetailsCtrl.value == null ? '' : this.sgTaskDetailsCtrl.value.toLowerCase()) !== -1)
        && (task.parentTaskDetails.toLowerCase().indexOf(this.sgParentTaskDetailsCtrl.value == null ? '' : this.sgParentTaskDetailsCtrl.value.toLowerCase()) !== -1)
        && (task.priority >= (this.sgPriorityFromCtrl.value == null ? Number.MIN_VALUE : this.sgPriorityFromCtrl.value))
        && (task.priority <= (((this.sgPriorityToCtrl.value == null) || (this.sgPriorityToCtrl.value == '')) ? Number.MAX_VALUE : this.sgPriorityToCtrl.value))
        && (this.getTimeFromDate(task.startDate, false) >= ((!this.sgStartDate.value) ? this.getTimeFromDate(task.startDate, false) : this.getTimeFromDate(this.sgStartDate.value, true)))
        && (this.getTimeFromDate(task.endDate, false) <= ((!this.sgEndDate.value) ? this.getTimeFromDate(task.endDate, false) : this.getTimeFromDate(this.sgEndDate.value, true)))
    });

  }

  getTimeFromDate(value: any, addTime: boolean): number {
    if (addTime)
      return new Date(value + "T00:00:00").getTime();
    return new Date(value).getTime();
  }

  get searchGroupCtrl() {
    return this.UsrFrm.get('searchGroup');
  }
  get sgTaskDetailsCtrl() {
    return this.searchGroupCtrl.get('taskDetails');
  }
  get sgParentTaskDetailsCtrl() {
    return this.searchGroupCtrl.get('parentTaskDetails');
  }
  get sgPriorityFromCtrl() {
    return this.searchGroupCtrl.get('priorityFrom');
  }
  get sgPriorityToCtrl() {
    return this.searchGroupCtrl.get('priorityTo');
  }
  get sgStartDate() {
    return this.searchGroupCtrl.get('startDate');
  }
  get sgEndDate() {
    return this.searchGroupCtrl.get('endDate');
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
        this.filteredTasks = this.viewTasks;
      });

    this.sgTaskDetailsCtrl.valueChanges.subscribe(() => this.filterTasks());
    this.sgParentTaskDetailsCtrl.valueChanges.subscribe(() => this.filterTasks());
    this.sgPriorityFromCtrl.valueChanges.subscribe(() => this.filterTasks());
    this.sgPriorityToCtrl.valueChanges.subscribe(() => this.filterTasks());
    this.sgStartDate.valueChanges.subscribe(() => this.filterTasks());
    this.sgEndDate.valueChanges.subscribe(() => this.filterTasks());
  }

}
