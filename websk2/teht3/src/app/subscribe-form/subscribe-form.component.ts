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
  flag: any;
  public condition = false;

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
      name: ['', Validators.required ],
      email: ['', Validators.required],
      food: ['', Validators.required]
    });
  }

  onSubmit() {

    this.flag = this.userForm.status;

    if (this.flag === 'VALID') {
      this.localStorageService.setFormData(this.userForm.value);
    } else {
      this.condition = true;
    }

    // this.localStorageService.setFormData();
  }


  ngOnInit() {

    this.foods = this.formDataService.getFoods();

  }


}
