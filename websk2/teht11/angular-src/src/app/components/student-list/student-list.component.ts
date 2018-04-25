import { Component, OnInit } from '@angular/core';
import { StudentDataService } from './../../services/student-data.service';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public students = [];

  constructor(
    private studentData: StudentDataService
  ) { }

  ngOnInit() {
    this.initStudents();
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
