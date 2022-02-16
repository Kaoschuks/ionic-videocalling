import { Component, OnInit } from '@angular/core';
declare let AgoraUIKit: any, document: any;
// import * as AgoraUIKit from 'agora-react-uikit';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  appId: string = "633313442061443482e167550875b1e8"
  // role = 'audience' || 'host'
  role = 'host'
  token = "00603d680531c6e4d32829fe60bc6405681IAC4Y/gX1hUES6AyRKg7YwKruSarvX4xvlambZAfapu/63ZXrgMAAAAAEAAWylBU0ZcOYgEAAQDOlw5i"
  // token = '367252ea-ee7e-4dbf-a5a8-b43c35ff8c5e@testMOOD@8640@1642871231'
  channel = 'testChannel'

  constructor() {
   }

  ngOnInit() {
    const el = document.querySelector('agora-react-web-uikit');
    el.addEventListener('agoraUIKitEndcall', (e) => {
      console.log('hello from html')
      // handle endcall event
      el.remove();
    });
    console.log(el)
  }

}
