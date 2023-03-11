import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleNotificacionPage } from './detalle-notificacion.page';

describe('DetalleNotificacionPage', () => {
  let component: DetalleNotificacionPage;
  let fixture: ComponentFixture<DetalleNotificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleNotificacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleNotificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
