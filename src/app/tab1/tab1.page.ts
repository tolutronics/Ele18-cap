import { Component, OnInit } from '@angular/core';
import { PassageService } from '../passage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import {CommentPage} from '../comment/comment.page';
import {FcommentPage} from '../fcomment/fcomment.page';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {
comments: any;
pm: any;
public unsubscribeBackEvent: any;
pcomments: any;
pcomment: any;
posts: any;
fposts: any;
fphotourl: string;
raw: any;
ffmatric: any;
fmatric: any;
ftitle: any;
ftext; any;
photourl: any;
comment: any;
matric: any;
ref: any;
count = 0 as any;
fname: any;
postData = {} as any;
title: any;
new: any;
topic: any;
topic1: any;
dataID: any;
topic2: any;
lname: any;
id: any;
idd: any;
pcmcount: any;
data1: any;
data2: any;
data3: any;
data4: any;
data5: any;
data6: any;
data7: any;
data8: any;
data9: any;
 text = [] as any;
color;
i;
isLoaded = false;
  constructor(private alertCtrl: AlertController, private platform: Platform, public db: AngularFireDatabase, private afs: AngularFirestore,
              private ps: PassageService, public modalController: ModalController, public router: Router) {
               
                IonicModule.forRoot({hardwareBackButton: false});
                setTimeout(() => {
      this.isLoaded = true;
    }, 3000);

    this.matric = this.ps.getDestn1();
    this.postData = this.ps.getDestn3();
    this.ffmatric = 'Lxvtyusadef';
    this.afs.doc(`/userProfile/${this.matric}`).valueChanges().subscribe(res => {
      this.fname = res['firstname'];
      this.lname = res ['lastname'];
      this.photourl = res ['photourl'];
    });
    this.idd = this.ps.getDestn3();
    this.afs.doc(`/pcomcount/${this.idd}`).valueChanges().subscribe(res => {
      this.pcmcount = res[ 'count' ];
});

    this.afs.doc(`/faceposts/${this.ffmatric}`).valueChanges().subscribe(res => {
      this.count = res ['count'];
      this.fmatric = res['fmatric'];
      this.ftext = res ['text'];
      this.ftitle = res ['title'];
      this.fphotourl = res ['photourl'];
    });
    this.getComment();
    this.getPost();


  }
//   ngOnInit(){
//    // IonicModule.forRoot({hardwareBackButton: false});
//     this.initializeBackButtonCustomHandler();
//   }
 
 
//   ionViewWillLeave() {
   
//       this.unsubscribeBackEvent && this.unsubscribeBackEvent();
      
//   }
 
//   initializeBackButtonCustomHandler(): void {
//     this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
//        this.alert();
//     });
    
//   }

//   async alert() {
//     const alert = await this.alertCtrl.create({
//     message: 'Do you want to close App',
//     subHeader: 'warning',
//     buttons: [
//       {
//         text: 'NO',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: () => {
//           alert.dismiss();
//         }
//       }, {
//         text: 'YES',
//         handler: () => {
          
//           navigator['app'].exitApp();
           

 
//         }
//       }
//     ]
//    });
//     await alert.present();
// }

 





 




  cmtBtn() {
    this.setComment();

  }
            arrayOne(n: number): any[] {
    return Array(n);
  }

  toPost() {
    this.router.navigate(['/post']);
  }

  PcmtBtn(id) {
    this.id = id;
    this.db.list(`/pcomment`).push({
      id: this.id,
      pcomment: this.pcomment,
      pcommenterF: this.fname,
    pcommenterL: this.lname

    });
    this.getPComment(this.id);



  }



  getPost() {
    this.db.list(`/posts`).valueChanges().subscribe(res => {
      this.raw = res;
      this.posts = this.raw.slice().reverse();
  });

  }

  getComment() {
    this.db.list(`/comments`).valueChanges().subscribe(res => {
      this.comments = res;
  });
}

titleCase(str) {
  return str.toLowerCase().split(' ').map((word => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  })).join(' ');
}



getPComment(idd) {
      this.db.list('/pcomment', ref => ref.orderByChild('title').equalTo(idd)).valueChanges()
    .subscribe((datas) => {
       this.pcomments = datas;
      });



}



 setComment() {
  this.matric = this.ps.getDestn1();
  this.fname = this.titleCase(this.fname);
  this.lname = this.titleCase(this.lname);
  
  this.db.list(`/comments`).push({
    comment: this.comment,
    commenterF: this.fname,
    commenterL: this.lname
  }).then(() => {
    this.comment = ' ';
 }, (error) => {
   console.log(error);
 });
 }




 comt2(id) {

  this.afs.doc(`/faceposts/${this.ffmatric}`).valueChanges().subscribe(res => {
    this.fmatric = res['fmatric'];
    this.ftext = res ['text'];
    this.ftitle = res ['title'];
    this.fphotourl = res ['photourl'];
    this.count = res ['count'];
  });

  this.postData = {
    count: this.count,
    fmatric: this.fmatric,
    text: this.ftext,
    title: this.ftitle,
    photourl: this.fphotourl

  };

  this.ps.setDestn4(this.postData);
  this.presentModal(id);
 }

 comt(id1, id2, id) {
  this.dataID = id;
  firebase.database().ref('posts').child(this.dataID).once('value', (snapshot => {
        this.data1 = snapshot.val().count;
        this.data2 = snapshot.val().day;
        this.data3 = snapshot.val().id;
        this.data4 = snapshot.val().name1;
        this.data5 = snapshot.val().name2;
        this.data6 = snapshot.val().photourl;
        this.data7 = snapshot.val().posterphoto;
        this.data8 = snapshot.val().text;
        this.data9 = snapshot.val().time;
    }));
  this.postData = {
      count: this.data1,
      day: this.data2,
      id: this.data3,
      name1: this.data4,
      name2: this.data5,
      photourl: this.data6,
      posterphoto: this.data7,
      text: this.data8,
      time: this.data9
    };
  this.ps.setDestn3(this.postData);
  this.presentModal2(id1, id2, id);
 }

 async presentModal1(id) {
  this.topic = id;
  const modal = await this.modalController.create({
   component: FcommentPage,
   componentProps: { id: this.topic }
 });
  return await modal.present();

}

 async presentModal(id) {
   this.topic = id;
   const modal = await this.modalController.create({
    component: FcommentPage,
    componentProps: { id: this.topic }
  });
   return await modal.present();

}

async presentModal2(id1, id2, id) {
  this.topic1 = id1;
  this.topic2 = id2;
  this.id = id;
  const modal = await this.modalController.create({
   component: CommentPage,
   componentProps: { id1: this.topic1, id2: this.topic2, id: this.id }
 });
  return await modal.present();

}


}
