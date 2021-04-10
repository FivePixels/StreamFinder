import { TestBed } from '@angular/core/testing';

import { MovieTVService } from './movie-tv.service';

describe('MovieTVService', () => {
  let service: MovieTVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieTVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
