import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
const APPLICATION_ID:string = 'GSq8nNrFb4E5zDB2ayDuag';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isBroadcasting = false;
  isPending = false;
  broadcaster: any;
  errListenerId = false;
  broadcastListenerId = false;

  constructor(
    private toastCtrl: ToastController,
    public platform: Platform) {

    platform.ready().then(() => {
      // Using array syntax workaround, since types are not declared.
      if (window['bambuser']) {
        this.broadcaster = window['bambuser']['broadcaster'];
        this.broadcaster.setApplicationId(APPLICATION_ID);
      } else {
        console.log("Cordova plugin not installed or running in a web browser");
      }
    });
  }

  async ionViewDidEnter() {
    try {
      this.platform.ready().then(async () => {
        if (APPLICATION_ID.endsWith('NGEME')) {
          await new Promise(resolve => setTimeout(resolve, 500)); // Let page animations to finish before using alert()
          alert('Warning: APPLICATION_ID is not set. Get your application id at https://dashboard.bambuser.com/developer and update pages/broadcaster/broadcaster.ts, then rebuild the app.');
        }
    
        // Engage our Ionic CSS background overrides that ensure viewfinder is visible.
        document.getElementsByTagName('body')[0].classList.add("show-viewfinder");
    
        if (!this.platform.is('capacitor')) {
          await new Promise(resolve => setTimeout(resolve, 500)); // Let page animations to finish before using alert()
          alert('This Ionic app is currently not running within a Cordova project. Broadcasting is only supported on iOS and Android devices.');
          return;
        }
    
        if (!this.broadcaster) {
          await new Promise(resolve => setTimeout(resolve, 500)); // Let page animations to finish before using alert()
          alert('Broadcasting plugin not detected. Try running `cordova plugin add cordova-plugin-bambuser` and rebuild your app.');
          return;
        }
    
        console.log('Starting viewfinder ');
        this.broadcaster.showViewfinderBehindWebView();
        // document.getElementsByTagName('body')[0].classList.add("show-viewfinder");
      }).catch((ex) => {
        console.log(ex)
      })
  
    } catch (e) {
      console.log(e)
    }
  }

  ionViewWillLeave() {
    // Disengage our Ionic CSS background overrides, to ensure the rest of the app looks ok.
    document.getElementsByTagName('body')[0].classList.remove("show-viewfinder");

    console.log('Removing viewfinder');
    if (this.broadcaster) {
      this.broadcaster.hideViewfinder();
    }
  }

  async start() {
    if (this.isBroadcasting || this.isPending) return;
    this.isPending = true;
    // const toast = this.toastCtrl.create({
    //   message: 'Starting broadcast...',
    //   position: 'middle',
    // });
    // await toast.present();

    console.log('Starting broadcast');
    try {
      await this.broadcaster.startBroadcast();
      // toast.dismiss();
      this.isBroadcasting = true;
      this.isPending = false;

      this.listenForError();
      this.listenForBroadcastId();

    } catch (e) {
      // toast.dismiss();
      this.isPending = false;
      alert('Failed to start broadcast');
      console.log(e);
    }
  }

  async stop() {
    if (!this.isBroadcasting || this.isPending) return;
    this.isPending = true;
    // const toast = this.toastCtrl.create({
    //   message: 'Ending broadcast...',
    //   position: 'middle'
    // });
    // await toast.present();

    console.log('Ending broadcast');
    try {
      await this.broadcaster.stopBroadcast();
      // toast.dismiss();
      this.isBroadcasting = false;
      this.isPending = false;
    } catch (e) {
      // toast.dismiss();
      this.isPending = false;
      alert('Failed to stop broadcast');
      console.log(e);
    }
  }

  listenForError() {
    if (this.errListenerId) return;
    this.errListenerId = this.broadcaster.addEventListener('connectionError', status => {
      this.isBroadcasting = false;
      this.isPending = false;
      // const toast = this.toastCtrl.create({
      //   message: 'Connection error',
      //   position: 'middle',
      //   duration: 3000,
      // });
      // toast.present();
    });
  }

  listenForBroadcastId() {
    const resourceUri = 'https://cdn.bambuser.net/broadcasts/0b9860dd-359a-67c4-51d9-d87402770319?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1482921565&da_static=1&da_ttl=0&da_signature=cacf92c6737bb60beb1ee1320ad85c0ae48b91f9c1fbcb3032f54d5cfedc7afe';
    if (this.broadcastListenerId) return;
    this.broadcastListenerId = this.broadcaster.addEventListener('broadcastIdAvailable', async broadcastId => {
      console.log(broadcastId)
      const { player } = window['bambuser']
      await player.setApplicationId(APPLICATION_ID);
      await player.showPlayerBehindWebView();
      player.loadBroadcast(resourceUri);
      // const toast = this.toastCtrl.create({
      //   message: `Broadcast id received: ${broadcastId}`,
      //   position: 'middle',
      //   duration: 3000,
      // });
      // toast.present();
    });
  }

  switchCamera() {
    if (this.broadcaster) {
      this.broadcaster.switchCamera();
    }
  }

}
