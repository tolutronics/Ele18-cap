import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPopPage } from './login-pop.page';

describe('LoginPopPage', () => {
  let component: LoginPopPage;
  let fixture: ComponentFixture<LoginPopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
