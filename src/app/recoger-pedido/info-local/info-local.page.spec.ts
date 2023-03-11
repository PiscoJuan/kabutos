import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoLocalPage } from './info-local.page';

describe('InfoLocalPage', () => {
  let component: InfoLocalPage;
  let fixture: ComponentFixture<InfoLocalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoLocalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
