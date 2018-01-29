import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.css']
})
export class SubscriberListComponent implements OnInit {

  test: any;
  userArray: any;

  constructor(private localStorageService: LocalStorageService) {

    this.userArray = this.localStorageService.getFormData() || [];

    console.log('this.userArray: ', this.userArray);

  }

  ngOnInit() {

    this.localStorageService.storageSubject.subscribe((data: string) => {
      this.userArray = this.localStorageService.getFormData();
    });

  }

}
