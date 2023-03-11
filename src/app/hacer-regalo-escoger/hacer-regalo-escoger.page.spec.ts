import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HacerRegaloEscogerPage } from './hacer-regalo-escoger.page';

describe('HacerRegaloEscogerPage', () => {
  let component: HacerRegaloEscogerPage;
  let fixture: ComponentFixture<HacerRegaloEscogerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerRegaloEscogerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HacerRegaloEscogerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
