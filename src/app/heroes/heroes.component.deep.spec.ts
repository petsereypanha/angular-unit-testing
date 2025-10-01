import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import {Component, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs';
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';

describe('HeroesComponent (shallow test)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<any>;
  let HEROES: Hero[];

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  });
  it('should render each hero as a HeroesComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES))
    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroesComponent));
    expect(heroComponentDEs.length).toBe(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  })
})
