import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CorrectoPage } from './correcto.page';

describe('CorrectoPage', () => {
  let component: CorrectoPage;
  let fixture: ComponentFixture<CorrectoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
