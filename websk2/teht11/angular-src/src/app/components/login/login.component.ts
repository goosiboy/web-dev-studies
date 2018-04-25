import {AuthService} from './../../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component(
  {selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})

export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLoginSubmit() {

    console.log("naps");

    const user = {
      username: this.username,
      password: this.password
    };

    // Authenticate User
    this.authService
      .findUser(user)
      .subscribe(function (data) {
        if (data.success) {
          console.log("ONNISTUI");
          this.handleLogin(data);
        } else {
          console.log("EPÄONNISTUI");
          this.handleError();
        }
      }.bind(this));

  }

  private handleLogin(data) {
    this.authService.storeUserData(data.token, data.user);
    this.router.navigate(['dashboard']);
  }

  private handleError() {
    this.router.navigate(['']);
  }

}
