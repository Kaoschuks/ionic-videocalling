import { Component } from '@angular/core';
declare let window: any, ConnectyCube: any;

let CREDENTIALS = {
  appId: 5696,
  // token: "",
  authKey: "t9shu7H3gjVYCeB",
  authSecret: "bkDyJytNsrOCv2N",
};

const MULTIPARTY_SERVER_ENDPOINT = 'wss://janus.connectycube.com:8989';

let appConfig = {
  debug: { mode: 1 },
  conference: { server: MULTIPARTY_SERVER_ENDPOINT },
}

let params = {
  name: "My meeting",
  start_date: new Date(Date.now()),
  end_date: new Date(Date.now()),
  attendees: [
    {id: 123, email: "kaoschuks@hotmail.com"}
  ],
  record: false,
  chat: false
};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {
    // ConnectyCube = window.ConnectyCube
    console.log(ConnectyCube)
    let obj = Object.create(ConnectyCube['ConnectyCube']);
    console.log(obj)
    if(ConnectyCube) {
      ConnectyCube['ConnectyCube'].createSession()
      .then((session) => {
        console.log(session);
        // Cr
        // ConnectyCube.init(CREDENTIALS, appConfig);
      })
      .catch((error) => {});
    }
  }

  start() {
    ConnectyCube.meeting.create(params)
    .then(meeting => {
      const confRoomId = meeting._id;
      const session = ConnectyCube.videochatconference.createNewSession();
      const mediaParams = {
        audio: true,
        video: true,
      };
      
      session.getUserMedia(mediaParams)
        .then((localStream) => {})
        .catch((error) => {});
    })
    .catch(error => { });
  }

}
