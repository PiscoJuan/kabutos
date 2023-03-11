import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarjetasDeRegaloPage } from './tarjetas-de-regalo.page';

describe('TarjetasDeRegaloPage', () => {
  let component: TarjetasDeRegaloPage;
  let fixture: ComponentFixture<TarjetasDeRegaloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetasDeRegaloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetasDeRegaloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
