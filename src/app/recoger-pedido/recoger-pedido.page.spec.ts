import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecogerPedidoPage } from './recoger-pedido.page';

describe('RecogerPedidoPage', () => {
  let component: RecogerPedidoPage;
  let fixture: ComponentFixture<RecogerPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecogerPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecogerPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
