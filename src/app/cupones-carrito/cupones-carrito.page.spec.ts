import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuponesCarritoPage } from './cupones-carrito.page';

describe('CuponesCarritoPage', () => {
  let component: CuponesCarritoPage;
  let fixture: ComponentFixture<CuponesCarritoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponesCarritoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuponesCarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
