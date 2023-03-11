import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncorrectoPage } from './incorrecto.page';

describe('IncorrectoPage', () => {
  let component: IncorrectoPage;
  let fixture: ComponentFixture<IncorrectoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorrectoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
