import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NombreComponentePage } from './nombre-componente.page';

describe('NombreComponentePage', () => {
  let component: NombreComponentePage;
  let fixture: ComponentFixture<NombreComponentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreComponentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NombreComponentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
