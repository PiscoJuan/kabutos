import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HacerRegaloPuntosPage } from './hacer-regalo-puntos.page';

describe('HacerRegaloPuntosPage', () => {
  let component: HacerRegaloPuntosPage;
  let fixture: ComponentFixture<HacerRegaloPuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerRegaloPuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HacerRegaloPuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
