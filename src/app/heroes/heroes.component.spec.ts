import { HeroesComponent } from './heroes.component';
      import { of } from 'rxjs';
      import { Hero } from '../hero';

      describe('HeroesComponent', () => {
        let component: HeroesComponent;
        let HEROES: Hero[];
        let mockHeroService: jasmine.SpyObj<any>;

        beforeEach(() => {
          HEROES = [
            { id: 1, name: 'SpiderDude', strength: 8 },
            { id: 2, name: 'Wonderful', strength: 24 },
            { id: 3, name: 'SuperDude', strength: 55 }
          ];
          mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
          component = new HeroesComponent(mockHeroService);
        });

        describe('deleteHero', () => {
          it('should remove the indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
          });

          it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
          });
        });
      });
