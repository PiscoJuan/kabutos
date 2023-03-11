import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesProductosPage } from './detalles-productos.page';

describe('DetallesProductosPage', () => {
  let component: DetallesProductosPage;
  let fixture: ComponentFixture<DetallesProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesProductosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
