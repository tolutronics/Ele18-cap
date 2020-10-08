import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingController, AlertController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  first: any;
  last: any;
  nick: any;
  matric: any;
  pass: any;
  photo: any;
  email: any;
  phone: any;
  linkedin: any;
  twitter: any;
  insta: any;
  hobbies: any;
  dislike: any;
  work: any;


  constructor(public router: Router, private Afd: AngularFireDatabase, public lc: LoadingController,
              private alertCtrl: AlertController) { }

              back() {
                this.router.navigate(['/admin']);
              }

  async Alert(Message: string, type: string) {
    const alert = await this.alertCtrl.create({
    message: Message,
    subHeader: type,
    buttons: ['OK']
   });
    await alert.present();
}
  Signup() {
    this.lc.create({
      message: 'Adding User',
      duration: 4000
    }).then((resy) => {
      resy.present();
      resy.onDidDismiss().then((dis) => {
      firebase.firestore().doc(`/userProfile/${this.matric}`).set({
      firstname: this.first,
      lastname: this.last,
      nickname: this.nick,
      matric: this.matric,
      password: this.pass,
      email: this.email,
      phone: this.phone,
      linkedin: this.linkedin,
      twitter: this.twitter,
      instagram: this.insta,
      photourl: this.photo,
      work: this.work,
      hobbies: this.hobbies,
      dislike: this.dislike

    }).then(() => {
        this.Alert('USER ADDED SUCCESSFULY', 'SUCCESS');

  }, (error) => {
    this.Alert(error, 'FAILED');
  });
  });
   });

  }



  ngOnInit() {
  }

}
