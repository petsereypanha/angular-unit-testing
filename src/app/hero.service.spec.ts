import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {MessageService} from './message.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe( 'HeroService', () => {
  let mockMessageService: jasmine.SpyObj<any>;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add', 'clear']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    })
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  })
  describe('getHeroes', () => {
    it('should call get with the correct URL',() => {
      // call getHeroes
      service.getHero(4).subscribe();
      // expect that the URL is correct
      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({id:4, name:'SuperDude', strength:100});
    })
  })

})
