import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PassageService } from '../passage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage  {
  weekday: any;
  keypath: any;
  topic: any;
  today: any;
  hours: any;
  time: any;
  day: any;
  minutes: any;
  ampm: any;
  image: any;
  PhotoUrl = '' as any;
  photourl = '' as any;
  btnText = 'CHOOSE' as any;
  s;
  d: any;
  photos: any;
  Ptitle: any;
  Ptext: any;
  imagePath: any;
  matric: any;
  count = 0 as any;
  id = 0 as any;
  newPostKey: any;
  updates = {} as any;
  fname: any;
  lname: any;
  postData = {} as any;
  constructor(public http : HttpClient,public afs: AngularFirestore, public lc: LoadingController, private alertCtrl: AlertController, public router: Router,
              public camera: Camera, private ps: PassageService, public storage: AngularFireStorage, public db: AngularFireDatabase) {
                this.matric = this.ps.getDestn1();
                this.afs.doc(`/userProfile/${this.matric}`).valueChanges().subscribe(res => {
                  console.log('details', res) ;
                  this.fname = res['firstname'];
                  this.lname = res ['lastname'];
                  this.photourl = res ['photourl'];
                  this.matric = res ['matric'];
                });
              
              }

  async Alert() {
    const alert = await this.alertCtrl.create({
    message: 'POSTED SUCCESSFULLY',
    subHeader: 'SUCCESS',
    buttons: ['OK']
   });
    await alert.present();
}


async Alert2() {
  const alert = await this.alertCtrl.create({
  message: 'PLEASE WRITE ABOUT YOUR POST',
  subHeader: 'ERROR',
  buttons: ['OK']
 });
  await alert.present();
}
  Post() {
    this.today = new Date();
    this.d =  this.today.getDay();
    this.hours = this.today.getHours();
    this.minutes = this.today.getMinutes();
    this.ampm = this.hours >= 12 ? 'pm' : 'am';
    this.hours = this.hours % 12;
    this.hours = this.hours ? this.hours : 12; 
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.time = this.hours + ':' + this.minutes + ' ' + this.ampm;
    this.weekday = new Array(7);
    this.weekday[0] =  'Sunday';
    this.weekday[1] = 'Monday';
    this.weekday[2] = 'Tuesday';
    this.weekday[3] = 'Wednesday';
    this.weekday[4] = 'Thursday';
    this.weekday[5] = 'Friday';
    this.weekday[6] = 'Saturday';

    this.day = this.weekday[this.d];

if (typeof( this.Ptext ) !== "undefined") {
  

    console.log('pressed');
    this.lc.create({
      message: 'POSTING',
      duration: 5000
    }).then((resy) => {
      resy.present();
      this.newPostKey = firebase.database().ref().child('posts').push().key;
      this.db.list(`pcomment/${this.newPostKey}`).valueChanges().subscribe((datas) => {
      this.count  = datas.length; });
      this.postData = {
      id: this.newPostKey,
      count: this.count,
      name1: this.fname,
      name2: this.lname,
      matric: this.matric,
      photourl: this.PhotoUrl,
      posterphoto: this.photourl,
      text: this.Ptext,
      time: this.time,
      day: this.day
    };

      this.ps.setDestn3(this.postData);


      this.updates['/posts/' + this.newPostKey] = this.postData;
      firebase.database().ref().update(this.updates);
      resy.onDidDismiss().then((dis) => {
        this.router.navigate(['/tabs']);
    });

    let headers = new HttpHeaders({ 'Authorization': 'key=AIzaSyA2nQW5hu0ucrKoqS6OCFcwHNC3pYHU2FA', 'Content-Type': 'application/json' });
    let options = {
      headers: headers
      }
    let msg= this.matric+" JUST POSTED SOMETHING INTERESTING"
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

}else{
this.Alert2();
}

  }

  back() {
    this.router.navigate(['/tabs']);
  }
  toGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      targetWidth: 800,
      targetHeight: 800,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      // allowEdit: true,
     }).then((imageData) => {

       const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz?&%$#@';
       const stringlength = 16;
       let randomstring = '';
       for (let i = 0; i < stringlength; i++) {
         const rnum = Math.floor(Math.random() * chars.length);
         randomstring += chars.substring(rnum, rnum + 1);
         this.imagePath = imageData;
         this.PhotoUrl = 'data:image/jpeg;base64,' + imageData;
         this.storage.ref('pictures/' + randomstring).putString(this.PhotoUrl, 'data_url');
         this.btnText = 'CHOSEN';


  }
});
}
   getPhoto() {
      this.s = this.db.list('/photo').valueChanges().subscribe(data => {
     this.photos = data;
   });
  }



}
