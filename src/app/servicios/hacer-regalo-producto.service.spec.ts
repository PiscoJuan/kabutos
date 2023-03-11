import { TestBed } from '@angular/core/testing';

import { HacerRegaloProductoService } from './hacer-regalo-producto.service';

describe('HacerRegaloProductoService', () => {
  let service: HacerRegaloProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HacerRegaloProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
