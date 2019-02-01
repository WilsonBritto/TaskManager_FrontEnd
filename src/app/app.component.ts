import { Component, OnInit } from '@angular/core';
import { NavBarService } from './Services/NavBar/nav-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TaskManager';
  constructor(private nav: NavBarService) { }

  ngOnInit(): void {
    this.nav.show();
  }
}
