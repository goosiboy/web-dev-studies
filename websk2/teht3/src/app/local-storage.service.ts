import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

  private storageSubject = new Subject<any>();

  private formData: any;
  private localHistory: any;
  private currentHistory: any;

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  setFormData(args: object) {
    this.formData = args;
    if (args !== null) {
      this.currentHistory = JSON.parse(localStorage.getItem('userArray')) || [];
      this.currentHistory.push(this.formData);
      localStorage.setItem('userArray', JSON.stringify(this.currentHistory));
      this.storageSubject.next('changed');
    } else {
      console.warn('args equals null');
    }
  }

  getFormData() {

    this.localHistory = JSON.parse(localStorage.getItem('userArray')) || [];

    if (this.localHistory !== null) {
      console.log('localHistory: ', this.localHistory);
      return this.localHistory;
    }

  }

}
