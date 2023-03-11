import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomicilioPage } from './domicilio.page';

describe('DomicilioPage', () => {
  let component: DomicilioPage;
  let fixture: ComponentFixture<DomicilioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomicilioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
