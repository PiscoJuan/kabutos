import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodigosPage } from './codigos.page';

describe('CodigosPage', () => {
  let component: CodigosPage;
  let fixture: ComponentFixture<CodigosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodigosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
