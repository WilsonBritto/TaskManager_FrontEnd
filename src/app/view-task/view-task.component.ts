import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../Services/NavBar/nav-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private nav: NavBarService, private router: Router) { }

  onEdit() {
    this.router.navigate(['/UpdateTask']);
  }

  ngOnInit() {
    this.nav.show();
  }

}
