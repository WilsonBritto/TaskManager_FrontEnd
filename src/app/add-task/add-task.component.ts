import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  Priority: number;
  UsrFrm: FormGroup;
  constructor(private nav: NavBarService, private fb: FormBuilder) {
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

  ngOnInit() {
    this.nav.show();
    this.PriorityCtrl.valueChanges.subscribe(d => this.Priority = d);
  }

}
