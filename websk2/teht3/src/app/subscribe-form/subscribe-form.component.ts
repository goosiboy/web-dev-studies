import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { User } from '../user';

import { FormDataService } from '../form-data.service';

import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-subscribe-form',
  templateUrl: './subscribe-form.component.html',
  styleUrls: ['./subscribe-form.component.css']
})
export class SubscribeFormComponent implements OnInit {
  foods: any;
  propertyStatus: any;
  propertyDirty: any;
  public validationAlert = false;

  userForm: FormGroup; // userForm is of type FormGroup

  constructor(
    private fob: FormBuilder,
    private formDataService: FormDataService,
    private localStorageService: LocalStorageService
  ) {

    this.createForm();

  }

  createForm() {
    this.userForm = this.fob.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      food: ['', Validators.required],
      sauna: ''
    });
  }

  onSubmit() {

    this.propertyStatus = this.userForm.status;
    this.propertyDirty = this.userForm.dirty;

    if (this.propertyStatus === 'VALID') {
      this.localStorageService.setFormData(this.userForm.value);
    } else {
      this.validationAlert = true;
      console.log(this.propertyStatus);
    }
  }

  ngOnInit() {

    this.foods = this.formDataService.getFoods();

  }


}
