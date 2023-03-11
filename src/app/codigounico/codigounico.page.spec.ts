import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodigounicoPage } from './codigounico.page';

describe('CodigounicoPage', () => {
  let component: CodigounicoPage;
  let fixture: ComponentFixture<CodigounicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigounicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodigounicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
