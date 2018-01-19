import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './heroes/mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  /**
   * Luomme observablen, joka on rxjs - kirjastossa sijaitseva objekti. Observablet ovat rxJS - kirjaston tarjoama vaihtoehto vanilla 
   * javascriptin promiseille. Observable on tarkoitettu data streamien (jatkuva datan syöttö asynkronisesti) hallintaan. 
   */
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

}
