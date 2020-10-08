import { Component } from '@angular/core';
import { PassageService } from '../passage.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 Rmatric: any;
details: object[] = [];
unsubscribeBackEvent;
result: any;
fname: any;
lname: any;
matric: any;
nick: any;
phone: any;
linkedin: any;
twitter: any;
pass: any;
instagram: any;
email: any;
photourl: any;
hobbies: any;
dislike: any;
work: any;
k;
  constructor(private platform: Platform, private store: NativeStorage, private afs: AngularFirestore, public router: Router, private ps: PassageService,
              public lc: LoadingController, private alertCtrl: AlertController, private Afd: AngularFireDatabase) {

    this.Rmatric = this.ps.getDestn1();
    this.getData();
  }

  


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
  this.store.clear();
}

  edit() {
    this.router.navigate(['/editprofile/']);
  }

  getData() {
    this.Rmatric = this.ps.getDestn1();
    this.afs.doc(`/userProfile/${this.Rmatric}`).valueChanges().subscribe(res => {
       this.fname = res['firstname'];
       this.lname = res ['lastname'];
       this.matric = res ['matric'];
       this.phone = res ['phone'];
       this.twitter = res ['twitter'];
       this.linkedin = res ['linkedin'];
       this.instagram = res ['instagram'];
       this.nick = res ['nickname'];
       this.email = res ['email'];
       this.pass = res ['password'];
       this.photourl = res ['photourl'];
       this.work = res ['work'];
       this.hobbies = res ['hobbies'];
       this.dislike = res ['dislike'];
      });
  }
}
