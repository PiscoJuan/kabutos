import { TestBed } from '@angular/core/testing';

import { BaneoService } from './baneo.service';

describe('BaneoService', () => {
  let service: BaneoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaneoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
