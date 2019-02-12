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
  constructor(private nav: NavBarService, private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService) {
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
    console.log(this.UsrFrm);
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
