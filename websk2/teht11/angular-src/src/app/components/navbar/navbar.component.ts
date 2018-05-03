import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logOut(function(res) {
      this.router.navigate(['']);
    }.bind(this));
  }

}
