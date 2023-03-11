import { TestBed } from '@angular/core/testing';

import { HacerRegaloService } from './hacer-regalo.service';

describe('HacerRegaloService', () => {
  let service: HacerRegaloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HacerRegaloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
