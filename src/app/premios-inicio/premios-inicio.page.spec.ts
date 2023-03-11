import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiosInicioPage } from './premios-inicio.page';

describe('PremiosInicioPage', () => {
  let component: PremiosInicioPage;
  let fixture: ComponentFixture<PremiosInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiosInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
