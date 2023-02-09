import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElegirEstabPage } from './elegir-estab.page';

describe('ElegirEstabPage', () => {
  let component: ElegirEstabPage;
  let fixture: ComponentFixture<ElegirEstabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirEstabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElegirEstabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
