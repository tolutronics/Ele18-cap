import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private firebase: Firebase,
              private afs: AngularFirestore,
              private platform: Platform) {
                console.log(this.firebase.getToken());
               }

              async getToken() {
                let token;

                if (this.platform.is('android')) {
                  token = await this.firebase.getToken();

                }

                if (this.platform.is('ios')) {
                  token = await this.firebase.getToken();
                  await this.firebase.grantPermission();
                }

                this.saveToken(token);
              }

              private saveToken(token) {
                if (!token) {
                  return this.afs.doc(`/devices/token`).set({

                    Token: 'token',
                    userId: 'testId'
                  });
                }
                return this.afs.doc(`/devices/${token}`).set({

                  Token: token,
                  userId: 'testId'
                });

              }
              onNotifications() {
                return this.firebase.onNotificationOpen();
              }
            }
