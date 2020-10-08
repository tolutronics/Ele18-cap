import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { PassageService } from '../passage.service';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-fcomment',
  templateUrl: './fcomment.page.html',
  styleUrls: ['./fcomment.page.scss'],
})
export class FcommentPage implements OnInit {
  fcomments: any;
  fcomment: any;
  matric: any;
  fname: any;
  lname: any;
  isLoaded = false;
  photourl: any;
  @Input() value: number;
  postData = {} as any;
  count = ' ' as any;
  constructor(public http : HttpClient, private navParams: NavParams, public modalController: ModalController,
              public db: AngularFireDatabase, private afs: AngularFirestore,
              private ps: PassageService) {


    this.matric = this.ps.getDestn1();
    this.afs.doc(`/userProfile/${this.matric}`).valueChanges().subscribe(res => {
      this.fname = res['firstname'];
      this.lname = res ['lastname'];
      this.photourl = res ['photourl'];
    });
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000);
   }

  ngOnInit() {
    this.getPComment();
  }
    
  close() {
    this.closeModal();
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }


  PcmtBtn() {
    if (this.fcomment === ' ') {
      console.log('eempty');
    } else {
     
      firebase.firestore().collection('').doc(`facecomments/${'Lxv'}`).set({
      fcomment: this.fcomment,
      fcommenterF: this.fname,
    fcommenterL: this.lname,
    photourl: this.photourl 

    }).then(() => {
      this.fcomment = ' ';
      let headers = new HttpHeaders({ 'Authorization': 'key=AIzaSyA2nQW5hu0ucrKoqS6OCFcwHNC3pYHU2FA', 'Content-Type': 'application/json' });
      let options = {
        headers: headers
        }
      let msg= this.matric+" MADE A COMMENT ON THE FACE OF THE WEEK"
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

    this.db.list(`facecomments/${'Lxv'}`).valueChanges().subscribe((datas) => {
    this.postData = this.ps.getDestn4();
    this.count  = datas.length;
    this.postData['count'] = this.count;
    firebase.firestore().doc(`/faceposts/${'Lxvtyusadef'}`).set(
      this.postData
      ).then(() => {
       
});
  });

}

  }

  getPComment() {
this.db.list(`facecomments/${'Lxv'}`).valueChanges().subscribe(data =>  {
      this.fcomments = data;
    });



}


}
