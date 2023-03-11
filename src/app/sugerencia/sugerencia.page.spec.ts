import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SugerenciaPage } from './sugerencia.page';

describe('SugerenciaPage', () => {
  let component: SugerenciaPage;
  let fixture: ComponentFixture<SugerenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugerenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SugerenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
