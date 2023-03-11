import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HacerRegaloMontoPage } from './hacer-regalo-monto.page';

describe('HacerRegaloMontoPage', () => {
  let component: HacerRegaloMontoPage;
  let fixture: ComponentFixture<HacerRegaloMontoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerRegaloMontoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HacerRegaloMontoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
