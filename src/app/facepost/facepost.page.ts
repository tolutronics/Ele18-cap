import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PassageService } from '../passage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-facepost',
  templateUrl: './facepost.page.html',
  styleUrls: ['./facepost.page.scss'],
})
export class FacepostPage implements OnInit {
  keypath: any;
  topic: any;
  image: any;
  PhotoUrl = '' as any;
  btnText = 'CHOOSE' as any;
  s;
  count = 0 as any;
  fmatric: any;
  photos: any;
  Ptitle: any;
  Ptext: any;
  imagePath: any;
  id = 0 as any;
  newPostKey: any;
  updates = {} as any;
  postData = {} as any;
  constructor(public http : HttpClient,  private ps: PassageService, public camera: Camera, public storage: AngularFireStorage,    public router: Router,
              public lc: LoadingController, private alertCtrl: AlertController, public db: AngularFireDatabase) {
               }

              async Alert() {
                const alert = await this.alertCtrl.create({
                message: 'POSTED SUCCESSFULLY',
                subHeader: 'SUCCESS',
                buttons: ['OK']
               });
                await alert.present();
            }

              Post() {

                this.lc.create({
                  message: 'POSTING',
                  duration: 5000
                }).then((resy) => {
                  resy.present();
                  resy.onDidDismiss().then((dis) => {
                  this.db.list(`facecomments/${'Lxv'}`).valueChanges().subscribe((datas) => {
                      this.count  = datas.length; });
                  this.postData = {
                        count: this.count,
                        title: this.Ptitle,
                        photourl: this.PhotoUrl,
                        text: this.Ptext,
                        fmatric: this.fmatric
                      };

                  this.ps.setDestn4(this.postData);

                  firebase.firestore().doc(`/faceposts/${'Lxvtyusadef'}`).set(
                    this.postData
                    ).then(() => {

      });
                  this.db.object(`facecomments/${'Lxv'}`).remove();

                  this.Alert();
                  this.router.navigate(['/admin']);
                  let headers = new HttpHeaders({ 'Authorization': 'key=AIzaSyA2nQW5hu0ucrKoqS6OCFcwHNC3pYHU2FA', 'Content-Type': 'application/json' });
                  let options = {
                    headers: headers
                    }
        let msg= "Discover Who is on the face of the week";
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
   });


  }

   getPhoto() {
      this.s = this.db.list('/photo').valueChanges().subscribe(data => {
     this.photos = data;
   });
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


  ngOnInit() {
  }
}
