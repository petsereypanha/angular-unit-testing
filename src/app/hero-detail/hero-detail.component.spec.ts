import {ComponentFixture, flush, TestBed} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute,mockHeroService: { updateHero: { and: { returnValue: (arg0: {}) => void; }; }; }, mockLocation;
  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: {get: () => {return '3'}}}
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation}
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
  });

  it('should render hero name in a h1 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent);
  });
  it('should call updateHero when save is called', () => {
    mockHeroService.updateHero.and.returnValue({});
    fixture.detectChanges();

    fixture.componentInstance.save();

    flush();
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  })
})
