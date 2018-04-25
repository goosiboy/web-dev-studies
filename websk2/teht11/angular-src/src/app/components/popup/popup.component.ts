import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentDataService } from './../../services/student-data.service';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Output() onBackButtonClick: EventEmitter<any> = new EventEmitter<any>();

  private subscription: Subscription;
  public student;
  public newForm: FormGroup;

  constructor(
    private studentData: StudentDataService
  ) { 
    this.newForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    }); 
  }

  ngOnInit() {
    this.subscription = this.studentData.observableData.subscribe(res => {this.student = res; });
  }

  backButtonClick() {
    this.onBackButtonClick.emit(false);
  }

  removeStudent() {

    if(this.student !== null) {
      this.studentData.removeStudent({
        studentNumber: this.student.studentNumber
      });
    }

  }

  onClickSubmit(value) {

    let newName;
    let newMail;

    if(value.name == null) {
      newName = this.student.name;
    } else {
      newName = value.name;
    }

    if(value.email == null) {
      newMail = this.student.email;
    } else {
      newMail = value.email;
    }

    let newData = {
      studentNumber: this.student.studentNumber,
      name: newName,
      email: newMail
    }

    this.studentData.setInfo(newData);
  }

  getStudent() {
    return this.student;
  }

}
