import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreguntaPage } from './pregunta.page';

describe('PreguntaPage', () => {
  let component: PreguntaPage;
  let fixture: ComponentFixture<PreguntaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
