import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  formData: any;

  constructor() { }

  setFormData(args: object) {
    this.formData = args;
    if (args !== null) {
      localStorage.setItem('userArray', JSON.stringify(this.formData));
    } else {
      console.warn('args equals null');
    }
  }

}
