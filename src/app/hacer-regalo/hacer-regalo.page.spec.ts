import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HacerRegaloPage } from './hacer-regalo.page';

describe('HacerRegaloPage', () => {
  let component: HacerRegaloPage;
  let fixture: ComponentFixture<HacerRegaloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerRegaloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HacerRegaloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
