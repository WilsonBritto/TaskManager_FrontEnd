import { TaskService } from './../Services/Data/Task/task.service';
import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../Shared/Models/task';
import { switchMap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  Priority: number;
  UsrFrm: FormGroup;
  curTaskId: number;
  tasks: Task[];
  curTask: Task;
  constructor(private nav: NavBarService, private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService) {
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
    value.taskId = this.curTaskId;
    this.taskService.update(this.curTaskId, value).subscribe(data => {
      alert("Updated the task with Task Id = " + data.taskId);
      this.router.navigate(['/ViewTask']);
    })
  }

  onCancel(): void {
    this.router.navigate(['/ViewTask']);
  }

  ngOnInit() {
    this.nav.hide();
    this.PriorityCtrl.valueChanges.subscribe(d => this.Priority = d);
    this.curTaskId = +this.activatedRoute.snapshot.paramMap.get('id');

    this.taskService.getAll().pipe(
      switchMap(data => {
        this.tasks = data;
        return this.taskService.get(this.curTaskId)
      })
    ).subscribe(task => {
      this.TaskCtrl.setValue(task.taskDetails);
      this.PriorityCtrl.setValue(task.priority);
      this.ParentTaskCtrl.setValue(task.parentId);
      this.StartDateCtrl.setValue(formatDate(task.startDate, "yyy-MM-dd", "en_IN"));
      this.EndDateCtrl.setValue(formatDate(task.endDate, "yyy-MM-dd", "en_IN"));
    });


  }

}
