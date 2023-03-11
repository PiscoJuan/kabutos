import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiosUtilizadosPage } from './premios-utilizados.page';

describe('PremiosUtilizadosPage', () => {
  let component: PremiosUtilizadosPage;
  let fixture: ComponentFixture<PremiosUtilizadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosUtilizadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiosUtilizadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
