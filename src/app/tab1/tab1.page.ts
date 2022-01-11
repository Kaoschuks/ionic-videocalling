import { Component, OnInit } from '@angular/core';
import { Jitsi } from 'capacitor-jitsi-meet';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  config: any = {
    roomName: 'room1', // room identifier for the conference
    url: 'https://meet.jit.si', // endpoint of the Jitsi Meet video bridge,
    displayName: "Favour", // user's display name
    email: "kaoschuks@hotmail.com", // user's email
    channelLastN: "10", // last N participants allowed to join
    startWithAudioMuted: true, // start with audio muted
    startWithVideoMuted: false, // start with video muted
    chatEnabled: false, // enable Chat feature
    inviteEnabled: false, // enable Invitation feature
    callIntegrationEnabled: false // enable call integration (CallKit on iOS, ConnectionService on Android)
  }

  constructor() {
  }

  async startCall() {
    const result: any = await Jitsi.joinConference(this.config);
    console.log("join status:"+ result.success);

    window.addEventListener('onConferenceJoined', (res: any) => {
      // do things here
      console.log(res)
    });

    window.addEventListener('onConferenceLeft', (res: any) => {
      // do things here
      console.log(res)
    });

    const results: any = await Jitsi.leaveConference({});
    console.log("leave status:"+ results.success);
  }

}
