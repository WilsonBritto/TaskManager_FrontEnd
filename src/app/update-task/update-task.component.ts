import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  Priority: number;
  UsrFrm: FormGroup;
  constructor(private nav: NavBarService, private fb: FormBuilder, private router: Router) {
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
  }

}
