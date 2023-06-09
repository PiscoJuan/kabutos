import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TresDsPage } from './tres-ds.page';

describe('TresDsPage', () => {
  let component: TresDsPage;
  let fixture: ComponentFixture<TresDsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TresDsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TresDsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
