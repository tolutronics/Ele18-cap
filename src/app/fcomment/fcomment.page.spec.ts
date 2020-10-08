import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FcommentPage } from './fcomment.page';

describe('FcommentPage', () => {
  let component: FcommentPage;
  let fixture: ComponentFixture<FcommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FcommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
