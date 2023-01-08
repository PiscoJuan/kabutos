import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroFbPage } from './registro-fb.page';

describe('RegistroFbPage', () => {
  let component: RegistroFbPage;
  let fixture: ComponentFixture<RegistroFbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroFbPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroFbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
