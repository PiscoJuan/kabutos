import { TestBed } from '@angular/core/testing';

import { DireccionEntregaService } from './direccion-entrega.service';

describe('DireccionEntregaService', () => {
  let service: DireccionEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccionEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
