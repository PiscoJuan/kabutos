import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleInicioPage } from './detalle-inicio.page';

describe('DetalleInicioPage', () => {
  let component: DetalleInicioPage;
  let fixture: ComponentFixture<DetalleInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
