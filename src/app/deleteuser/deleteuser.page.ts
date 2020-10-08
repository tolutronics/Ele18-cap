import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PassageService } from '../passage.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.page.html',
  styleUrls: ['./deleteuser.page.scss'],
})
export class DeleteuserPage  {

  mates = [] as any;
 details: any;
 i;
 queryText: any;
 mat: any;
 loadedmates = [] as any;
  constructor(private afs: AngularFirestore, public router: Router, private ps: PassageService) {
    this.mat = this.ps.getDestn1();
        this.getData();
      }

      getData() {
        this.afs.collection('userProfile').valueChanges().subscribe(data => {
           this.mates = data;
           });
      }

      delete(i) {
        this.details = i;


        this.afs.collection('userProfile').doc(`${this.details.matric}`).delete();
            }

            ngOnInit() {
              this.afs.collection(`userProfile`).valueChanges().subscribe(goalList => {
              this.mates = goalList;
              this.loadedmates = goalList;
              });
              }

            initializeItems(): void {
              this.mates = this.loadedmates;
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
