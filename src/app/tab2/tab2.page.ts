import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PassageService } from '../passage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
 mates = [] as any; 
  isLoaded = false;
  unsubscribeBackEvent;
 matesDymmy = ['dummy1', 'dummy2', 'dummy3' ];
 loadedmates = [] as any;
 details: any;
 queryText: any;
 mat: any;
 i;
  constructor(private platform: Platform, private afs: AngularFirestore, public router: Router, private ps: PassageService) {

    this.mat = this.ps.getDestn1();
    console.log(this.matesDymmy);
    setTimeout(() => {
      this.isLoaded = true;
    }, 3000);
      }

      // ionViewWillEnter() {
      //   setTimeout(() => {
      //     this.getData();
      //   }, 5000);
      // }

      getData() {
        this.afs.collection('userProfile').valueChanges().subscribe(data => {
           this.mates = data;
           });
      }

     
    

      View(i) {
        this.details = i;
        this.ps.setDestn2(this.details.matric);
        this.router.navigate(['/viewprofile']);
      }
      initializeItems(): void {
        this.mates = this.loadedmates;
        }

  
            arrayOne(n: number): any[] {
    return Array(n);
  }

        ngOnInit() {
          this.afs.collection(`userProfile`).valueChanges().subscribe(goalList => {
          this.mates = goalList;
          this.loadedmates = goalList;
          });
          }


update(evt) {
this.initializeItems(); 

const searchTerm = evt.srcElement.value;

if (!searchTerm) {
return;
}

this.mates = this.mates.filter(currentGoal => {
if ((currentGoal.firstname && searchTerm) || (currentGoal.lastname && searchTerm) || (currentGoal.matric && searchTerm))  {
if ((currentGoal.firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
(currentGoal.lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
(currentGoal.matric.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)) {
return true;
}
return false;
}
});
}
}
