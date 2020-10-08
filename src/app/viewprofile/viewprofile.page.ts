import { Component, OnInit } from '@angular/core';
import { PassageService } from '../passage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.page.html',
  styleUrls: ['./viewprofile.page.scss'],
})
export class ViewprofilePage {
Rmatric: any;
mates: any;
result: any;
fname: any;
lname: any;
matric: any;
nick: any;
phone: any;
twitter: any;
linkedin: any;
pass: any;
instagram: any;
email: any;
photourl: any;
hobbies: any;
dislike: any;
work: any;
unsubscribeBackEvent;

  constructor(private platform: Platform, private afs: AngularFirestore, private ps: PassageService, public router: Router) {

    this.Rmatric = this.ps.getDestn2();
    this.getData();
  }

  // ngOnInit(){
  //   this.initializeBackButtonCustomHandler();
  // }
 
 
  // //Called when view is left
 
 
  // initializeBackButtonCustomHandler(): void {
  //   this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999,  () => {
  //       // alert("back pressed home" + this.constructor.name);
  //       this.router.navigate(['/tabs/tab2']);
  //   });
  //   /* here priority 101 will be greater then 100 
  //   if we have registerBackButtonAction in app.component.ts */
  // }

  getData() {
    this.Rmatric = this.ps.getDestn2();
    this.afs.doc(`/userProfile/${this.Rmatric}`).valueChanges().subscribe(res => {
       this.fname = res['firstname'];
       this.lname = res ['lastname'];
       this.matric = res ['matric'];
       this.phone = res ['phone'];
       this.linkedin = res ['linkedin'];
       this.twitter = res ['twitter'];
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

  back() {
    this.router.navigate(['/tabs/tab2']);
  }

}
