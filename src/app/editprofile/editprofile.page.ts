import { Component } from '@angular/core';
import { PassageService } from '../passage.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage {
  Rmatric: any;
  details: object[] = [];
  result: any;
  fname: any;
  lname: any;
  matric: any;
  pass: any;
  nick: any;
  phone: any;
  twitter: any;
  linkedin: any;
  instagram: any;
  email: any;
   hobbies: any;
  dislike: any;
  work: any;
  k;

  Hobbies: any;
  Dislike: any;
  Work: any;
  Fname: any;
  Lname: any;
  Nick: any;
  Matric: any;
  Pass: any;
  Email: any;
  Phone: any;
  Linkedin: any;
  Twitter: any;
  Instagram: any;
  key: any;
  unsubscribeBackEvent;
  PhotoUrl: any;

  constructor(
    public http : HttpClient, 
    private platform: Platform,
    public lc: LoadingController,
    private afs: AngularFirestore,
    public router: Router,
    private ps: PassageService,
    public camera: Camera,
    public storage: AngularFireStorage,
    private alertCtrl: AlertController,
    private Afd: AngularFireDatabase) {

    this.Rmatric = this.ps.getDestn1();
    this.getData();
   }

   async Alert() {
    const alert = await this.alertCtrl.create({
    message: 'Profile Updated Succesfully',
    buttons: [
      {
        text: 'ok',
        role: 'done',
        handler: () => {
          this.router.navigate(['/tabs/tab3']);
        }
      }]
   });
    await alert.present();
}

async Alert2() {
  const alert = await this.alertCtrl.create({
  message: 'KINDLY FILL ALL FIELDS',
  buttons: [
    {
      text: 'ok',
      role: 'done',
      handler: () => {
        
      }
    }]
 });
  await alert.present();
}


editPic() {

  this.camera.getPicture({
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    targetWidth: 800,
    targetHeight: 800,
    quality: 100,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: this.camera.DestinationType.DATA_URL,
     allowEdit: true,
   }).then((imageData) => {

     const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz?&%$#@';
     const stringlength = 16;
     let randomstring = '';
     for (let i = 0; i < stringlength; i++) {
       const rnum = Math.floor(Math.random() * chars.length);
       randomstring += chars.substring(rnum, rnum + 1);
       this.PhotoUrl = 'data:image/jpeg;base64,' + imageData;
       this.storage.ref('pictures/' + randomstring).putString(this.PhotoUrl, 'data_url');



}
});

}

  getData() {
    this.Rmatric = this.ps.getDestn1();
    this.afs.doc(`/userProfile/${this.Rmatric}`).valueChanges().subscribe(res => {
       this.fname = res['firstname'];
       this.lname = res ['lastname'];
       this.matric = res ['matric'];
       this.phone = res ['phone'];
       this.twitter = res ['twitter'];
       this.instagram = res ['instagram'];
       this.nick = res ['nickname'];
       this.email = res ['email'];
       this.linkedin = res ['linkedin'];
       this.pass = res ['password'];
       this.PhotoUrl = res ['photourl'];
       this.work = res ['work'];
       this.hobbies = res ['hobbies'];
       this.dislike = res ['dislike'];
      });
  }

  edited() {

    if((typeof(this.Fname) && typeof(this.Lname) && typeof(this.Nick) && typeof(this.Matric) && typeof(this.Pass) && typeof(this.Email) && typeof(this.Phone) && typeof(this.Twitter)
    && typeof(this.Linkedin) && typeof(this.Instagram) && typeof(this.PhotoUrl) && typeof(this.Work) && typeof(this.Hobbies) && typeof(this.Dislike)) !== "undefined" ){

 
    this.lc.create({
      message: 'Updating Your Profile',
      duration: 7000
    }).then((res) => {
      res.present();
      firebase.firestore().doc(`/userProfile/${this.Rmatric}`).set({
        firstname: this.Fname,
        lastname: this.Lname,
        nickname: this.Nick,
        matric: this.Matric,
        password: this.Pass,
        email: this.Email,
        phone: this.Phone,
        twitter: this.Twitter,
        linkedin: this.Linkedin,
        instagram: this.Instagram,
        photourl: this.PhotoUrl,
        work: this.Work,
        hobbies: this.Hobbies,
        dislike: this.Dislike
      }).then(() => {
        let headers = new HttpHeaders({ 'Authorization': 'key=AIzaSyA2nQW5hu0ucrKoqS6OCFcwHNC3pYHU2FA', 'Content-Type': 'application/json' });
        let options = {
          headers: headers
          }
        let msg= this.matric+" JUST UPDATED HIS PROFILE, CHECK IT OUT "
        let notification = {
          "notification": {
            "title": "Message from ELE18 app",
            "body": msg,
            "click_action": "FCM_PLUGIN_ACTIVITY",
            "sound": "default"
          }, "data": {
            //OPTIONAL PARAMS
          },
          "to":"/topics/all",
          "priority": "high"
        }
        let url = 'https://fcm.googleapis.com/fcm/send';
        this.http.post(url, notification, options).subscribe(resp => {
          console.log(resp);
          });
    });

      res.onDidDismiss().then((dis) => {
        this.Alert();
       

      });
    });

  } else{
    this.Alert2();
  }

}
}
