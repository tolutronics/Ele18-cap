import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { PassageService } from '../passage.service';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  weekday: any;
  updates = {} as any;
  today: any;
  hours: any;
  time: any;
  day: any;
  minutes: any;
  d: any;
  ampm: any;
  comments: any;
  pcomments: any;
  pcomment: any;
  posts: any;
  photourl: any;
  comment: any;
  postData = {} as any;
  new = {} as any;
  name1: any;
  name2: any;
  matric: any;
  ref: any;
  fname: any;
  title: any;
  id: any;
  topic: any;
  commentCount: any;
  count = ' ' as any;
  len: any;
  lname: any;
  isLoaded = false;
  @Input() value: number;

  constructor(public http : HttpClient, private navParams: NavParams, public modalController: ModalController,
              public db: AngularFireDatabase, private afs: AngularFirestore,
              private ps: PassageService, public lc: LoadingController) {


    this.matric = this.ps.getDestn1();
    this.postData = this.ps.getDestn3();
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
    this.name1 = this.navParams.data.id1;
    this.name2 = this.navParams.data.id2;
    this.id = this.navParams.data.id;
    this.getPComment();

    this.db.list(`pcomment/${this.id}`).valueChanges().subscribe((datas) => {
      this.count  = datas.length;
      this.pcomments = datas;

      firebase.firestore().doc(`/pcomcount/${this.id}`).set({
        count: this.count
      });

    });

  }

  close() {
    this.closeModal();
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalController.dismiss(onClosedData);
  }


  PcmtBtn() {
    this.today = new Date();
    this.d =  this.today.getDay();
    this.hours = this.today.getHours();
    this.minutes = this.today.getMinutes();
    this.ampm = this.hours >= 12 ? 'pm' : 'am';
    this.hours = this.hours % 12;
    this.hours = this.hours ? this.hours : 12;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.time = this.hours + ':' + this.minutes + ' ' + this.ampm;

    this.db.list(`pcomment/${this.id}`).push({
      pcomment: this.pcomment,
      pcommenterF: this.fname,
    pcommenterL: this.lname,
    photourl: this.photourl,
    time: this.time
    }).then(() => {
      this.pcomment = ' ';
      
      let headers = new HttpHeaders({ 'Authorization': 'key=AIzaSyA2nQW5hu0ucrKoqS6OCFcwHNC3pYHU2FA', 'Content-Type': 'application/json' });
      let options = {
        headers: headers
        }
        let msg= this.matric+" MADE A COMMENT ON A POST BY "+ this.name1;
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

    this.db.list(`pcomment/${this.id}`).valueChanges().subscribe((datas) => {
      this.postData = this.ps.getDestn3();
      this.count  = datas.length;
      this.postData['count'] = this.count;
      this.updates['/posts/' + this.id] = this.postData;
      firebase.database().ref().update(this.updates).then(()=>{
        
        
      });
    }) ;


  }

  getPComment() {
    this.db.list(`pcomment/${this.id}`).valueChanges().subscribe((datas) => {
     this.count  = datas.length;
     this.pcomments = datas;
    });

}

}
