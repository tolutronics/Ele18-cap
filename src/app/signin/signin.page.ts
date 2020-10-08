import { Alert } from 'selenium-webdriver';
import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { TabsPage } from '../tabs/tabs.page';
import { FormsModule } from '@angular/forms';
import { PassageService } from '../passage.service';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
const { Network } = Plugins;
@Component({

  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit, OnDestroy  {
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;
  open=false
reseticon="refresh-sharp"
btnlabel="LOG IN"
resetclass="none"
outclass="none"
signinclass="none"
icon_name="arrow-forward-sharp"
ischecked: any;
Device: any;
  matric: any;
  pass: any;
  keypath: any;
  username: any;
  password: any;
  value: any;
  Lmatric: any;
  Lpass: any;
  web:boolean=false;
  constructor(
    private platform: Platform,
    private store: NativeStorage,
    public lc: LoadingController,
    private alertCtrl: AlertController,
    private afs: AngularFirestore,
    public router: Router,
    private Afd: AngularFireDatabase,
    private ps: PassageService,
    private device: Device) { 


      if (this.platform.is('desktop')) {
        this.web=false;
      }
    }
    forgetOpen(){
      this.outclass="none"
  
      this.open=true;
    }
    forgetClose(){
      this.outclass="forgetDialog-out"
      setTimeout(() => 
      {
        this.open=false;
        this.resetclass = "none";
      },
      500);
      
    }

    async Alert(msg,sub) {
      const alert = await this.alertCtrl.create({
      message: msg,
      subHeader: sub,
      buttons: ['OK']
     });
      await alert.present();
  }

  datachanged(e) {
    this.ischecked = e.currentTarget.checked;
    console.log(e);
    console.log(this.ischecked);
}

  
 Login() {
     if (this.matric!=null || this.pass!=null) {
    this.signinclass="signin-ani"
    this.icon_name="refresh-sharp"
    this.btnlabel="LOG IN"
    setTimeout(async () => 
    {
      let stat =await Network.getStatus();

      console.log(stat.connected)
  
  
       if (stat.connected) {
        this.ps.setDestn(this.matric);
        this.afs.doc(`/userProfile/${this.matric}`).valueChanges().subscribe(async (res) => {
           console.log('res1', res);
           this.Lmatric = await res['matric'];
           this.Lpass = await res['password'];


           this.afs.doc(`/admins/${this.matric}`).valueChanges().subscribe(async (res) => {
             console.log('res2', res);
             this.username = await res['username'];
             this.password = await res['password'];





             if (this.Lmatric === this.matric && this.Lpass === this.pass) {
               this.signinclass = "success";
               this.icon_name = "checkmark-sharp";
               this.btnlabel = "Success";
               setTimeout(() => {
                 this.router.navigate(['/tabs']);
               },
                 2000);
             }
             else if (this.username === this.matric && this.password === this.pass) {
               this.signinclass = "success";
               this.icon_name = "checkmark-sharp";
               this.btnlabel = "Success";
               setTimeout(() => {
                 this.router.navigate(['/admin']);
               },
                 1000);
             }
             else {
               this.signinclass = "none";
               this.btnlabel = "LOG IN";
               this.icon_name = "arrow-forward-sharp";
               this.Alert('INVALID LOGIN', 'ERROR');
             }


           });
         });
  
                     
  
        if (this.ischecked ) {
          this.Device = this.device.uuid;
          this.store.setItem('myitem', { device: this.Device, matric: this.matric})
        .then(
          () => console.log('Stored item!', ),
          error => console.error('Error storing item', error)
        );
        }
  
      } else {
        this.signinclass="none"
        this.icon_name="arrow-forward-sharp"
       
          this.Alert('It seems you are offline','Error');
    
        
      
    }
  
    },
    3000);
  }
  else{
    this.Alert('please provide details','Error');
  }

     
 

     

}




async ngOnInit() {
  let stat =await Network.getStatus();

  console.log(stat.connected)

}

ngOnDestroy() {
  this.networkListener.remove();
}

}
