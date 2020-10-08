import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteuserPage } from './deleteuser.page';

describe('DeleteuserPage', () => {
  let component: DeleteuserPage;
  let fixture: ComponentFixture<DeleteuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
