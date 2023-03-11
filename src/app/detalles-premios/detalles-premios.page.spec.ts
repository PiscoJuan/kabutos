import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallesPremiosPage } from './detalles-premios.page';

describe('DetallesPremiosPage', () => {
  let component: DetallesPremiosPage;
  let fixture: ComponentFixture<DetallesPremiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallesPremiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesPremiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
