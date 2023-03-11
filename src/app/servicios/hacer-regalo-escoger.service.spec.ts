import { TestBed } from '@angular/core/testing';

import { HacerRegaloEscogerService } from './hacer-regalo-escoger.service';

describe('HacerRegaloEscogerService', () => {
  let service: HacerRegaloEscogerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HacerRegaloEscogerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
