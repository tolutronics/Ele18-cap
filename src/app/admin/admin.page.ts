import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public router: Router, public lc: LoadingController, private alertCtrl: AlertController) { }

  async Alert() {
    const alert = await this.alertCtrl.create({
    message: 'Do you want to logout',
    subHeader: 'warning',
    buttons: [
      {
        text: 'NO',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          alert.dismiss();
        }
      }, {
        text: 'YES',
        handler: () => {
          this.lc.create({
      message: 'Logging you out',
      duration: 7000
    }).then((resy) => {
      resy.present();

      resy.onDidDismiss().then((dis) => {
        this.router.navigate(['/signin']);
              });

  });
        }
      }
    ]
   });
    await alert.present();
}

logout() {
  this. Alert();
}
  toPost() {
    this.router.navigate(['/post']);
  }

  tofacePost() {
    this.router.navigate(['/facepost']);
  }

  AddUser() {
    this.router.navigate(['/signup']);
  }

  DeleteUser(){
    this.router.navigate(['/deleteuser']);
  }

  ngOnInit() {
  }

}
