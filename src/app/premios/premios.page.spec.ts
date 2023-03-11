import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiosPage } from './premios.page';

describe('PremiosPage', () => {
  let component: PremiosPage;
  let fixture: ComponentFixture<PremiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
