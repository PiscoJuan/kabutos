import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuponesPage } from './cupones.page';

describe('CuponesPage', () => {
  let component: CuponesPage;
  let fixture: ComponentFixture<CuponesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuponesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuponesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
