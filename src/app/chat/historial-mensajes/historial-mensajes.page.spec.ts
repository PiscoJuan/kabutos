import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialMensajesPage } from './historial-mensajes.page';

describe('HistorialMensajesPage', () => {
  let component: HistorialMensajesPage;
  let fixture: ComponentFixture<HistorialMensajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialMensajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialMensajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
