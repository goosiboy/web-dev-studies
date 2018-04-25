import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StudentDataService {

  public studentData;
  private clickedStudentData;
  public observableData;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.observableData = new BehaviorSubject(this.clickedStudentData);
  }

  ngOnInit(): void {
  }

  clickedStudent(student) {
    this.clickedStudentData = student;
    this.observableData.next(this.clickedStudentData);
  }

  getAll(callback) {               
    return this.http.get('http://localhost:3000/findAll').subscribe(function(data) {
      this.studentData = data;
      callback(this.studentData);
    });
  }

  removeStudent(userID) {
    if(userID !== null) {
      const token = this.authService.tokenGetter();

      console.log("userID: ", userID);

      const headers = new HttpHeaders()
                          .set('Content-Type', 'application/json')
                          .set('x-access-token', token);
                          
      return this.http.post('http://localhost:3000/remove', userID, { headers: headers }).subscribe(response => {
        console.log("data: ", response);
      });
    } else {
      throw "student was empty.";
    }
  }

  setInfo(newData) {
    if(newData !== null) {
      const token = this.authService.tokenGetter();

      console.log("newData: ", newData);

      const headers = new HttpHeaders()
                          .set('Content-Type', 'application/json')
                          .set('x-access-token', token);
                          
      return this.http.put('http://localhost:3000/modifyInfo', newData, { headers: headers }).subscribe(response => {
        console.log("data: ", response);
      });
    } else {
      throw "student was empty.";
    }
  }

}
