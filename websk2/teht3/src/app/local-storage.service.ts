import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

  public storageSubject = new Subject<any>();

  private formData: any;
  private localHistory: any;
  private currentHistory: any;
  private placeHolder: any = { name: null, email: null, food: null, sauna: null };

  setFormData(args: object) {
    this.formData = args;
    if (args !== null) {
      this.storageSubject.next(args);
      this.currentHistory = JSON.parse(localStorage.getItem('userArray')) || [];
      this.currentHistory.push(this.formData);
      localStorage.setItem('userArray', JSON.stringify(this.currentHistory));
    } else {
      console.warn('args equals null');
    }
  }

  getFormData() {

    this.localHistory = JSON.parse(localStorage.getItem('userArray')) || [];

    if (this.localHistory !== null) {
      return this.localHistory;
    } else {
      return JSON.parse(this.placeHolder);
    }

  }

}
