import { Injectable } from '@angular/core';

@Injectable()
export class FormDataService {

  foods = ['Ei mitään', 'Liha', 'Kana', 'Kasvis'];

  constructor() {

  }

  getFoods() {
    return this.foods;
  }

}
