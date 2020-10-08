import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeviewPage } from './homeview.page';

describe('HomeviewPage', () => {
  let component: HomeviewPage;
  let fixture: ComponentFixture<HomeviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
