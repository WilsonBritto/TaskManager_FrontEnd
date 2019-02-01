import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private nav: NavBarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
