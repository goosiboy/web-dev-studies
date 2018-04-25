import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: Http
  ) {}

  findUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/auth', user, {headers: headers})
        .map(function(res) {
            return res.json();
        });
  }

  /**
   * Assign authToken
   */
  loadToken() {
    const token = this.tokenGetter();
    this.authToken = token;
  }

  /**
   * A simple token getter. Returns the JWT.
   */
  tokenGetter() {
    return localStorage.getItem('id_token');
  }

  /**
   * Checks if the token is expired or not. Returns true or false.
   * Needed for the authentication guard.
   */
  tokenExpired() {
    const helper = new JwtHelperService();
    const token = this.tokenGetter();
    const tokenExpired: boolean = helper.isTokenExpired(token);

    return tokenExpired;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logOut(callback) {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    const storage = window.localStorage.length;
    if (this.authToken === null && this.user === null && storage === 0) {
      callback(true);
    }
  }

}