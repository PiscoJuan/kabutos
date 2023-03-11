import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoliticasPage } from './politicas.page';

describe('PoliticasPage', () => {
  let component: PoliticasPage;
  let fixture: ComponentFixture<PoliticasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliticasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoliticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
