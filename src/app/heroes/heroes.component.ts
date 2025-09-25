import {Component, Input, OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import {NgForOf} from '@angular/common';
import {HeroComponent} from '../hero/hero.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [
    NgForOf,
    HeroComponent
  ]
})
export class HeroesComponent implements OnInit {
  @Input() heroes!: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    var strength = 11;
    if (!name) {
      return;
    }
    this.heroService.addHero({ name, strength } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
