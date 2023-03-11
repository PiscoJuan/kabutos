import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleHistorialPage } from './detalle-historial.page';

describe('DetalleHistorialPage', () => {
  let component: DetalleHistorialPage;
  let fixture: ComponentFixture<DetalleHistorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleHistorialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
