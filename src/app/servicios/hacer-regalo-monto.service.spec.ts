import { TestBed } from '@angular/core/testing';

import { HacerRegaloMontoService } from './hacer-regalo-monto.service';

describe('HacerRegaloMontoService', () => {
  let service: HacerRegaloMontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HacerRegaloMontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
