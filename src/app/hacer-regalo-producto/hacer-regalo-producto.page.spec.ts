import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HacerRegaloProductoPage } from './hacer-regalo-producto.page';

describe('HacerRegaloProductoPage', () => {
  let component: HacerRegaloProductoPage;
  let fixture: ComponentFixture<HacerRegaloProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerRegaloProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HacerRegaloProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
