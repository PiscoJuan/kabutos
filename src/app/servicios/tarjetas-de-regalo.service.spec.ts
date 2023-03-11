import { TestBed } from '@angular/core/testing';

import { TarjetasDeRegaloService } from './tarjetas-de-regalo.service';

describe('TarjetasDeRegaloService', () => {
  let service: TarjetasDeRegaloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetasDeRegaloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
