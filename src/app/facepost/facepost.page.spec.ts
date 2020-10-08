import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacepostPage } from './facepost.page';

describe('FacepostPage', () => {
  let component: FacepostPage;
  let fixture: ComponentFixture<FacepostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacepostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacepostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
