import {ComponentFixture, TestBed} from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import {Component, Directive, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs';
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export  class RouterLinkStubDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}


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
      declarations: [HeroesComponent,  HeroComponent],
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
  it('should call heroService.deleteHero when the Hero Component is delete button is clicked ', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroesComponent));
    heroComponent[0].triggerEventHandler('delete', null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])
  })
  it('should call heroService.addHero when the Hero Component is add button is clicked ', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    mockHeroService.addHero.and.returnValue(of({id: 5, name: 'name', strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'name';
    inputElement.triggerEventHandler('keyup.enter', null);
    expect(mockHeroService.addHero).toHaveBeenCalledWith({name: 'name', strength: 4});
  })
  it('should have the correct route for the first hero', () => {
    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroesComponent));

    let routerLink = heroComponent[0].query(By.directive(RouterLinkStubDirectiveStub)).injector.get(RouterLinkStubDirectiveStub);
    heroComponent[0].query(By.css('a')).triggerEventHandler('click', null);
    expect(routerLink.navigatedTo).toBe('/detail/1');
  })
})
