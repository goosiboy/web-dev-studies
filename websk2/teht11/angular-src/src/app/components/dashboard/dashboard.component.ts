import { Component, OnInit } from '@angular/core';
import { StudentDataService } from './../../services/student-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from './../popup/popup.component';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public students = [];
  public newForm: FormGroup;
  public popUp: boolean = false;

  constructor(
    private studentData: StudentDataService
  ) { }

  ngOnInit() {
    this.initStudents();
  }

  studentListClick(student) {
    this.popUp = true;
    this.studentData.clickedStudent(student);
  }

  onBackButtonClick(event) {
    this.popUp = event;
  }

  initStudents() {
    this.studentData.getAll(function(res) {
      this.resolveStudents(res);
    }.bind(this));

  }

  resolveStudents(res) {

    let student = {};

    for(let i = 0; i < res.length; i++) {
      student = {
        studentNumber: res[i].studentNumber,
        name: res[i].name,
        email: res[i].email
      }
      this.students.push(student);
    }
  }
}
