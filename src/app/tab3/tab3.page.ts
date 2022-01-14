import { Component } from '@angular/core';
import adapter from 'webrtc-adapter';
window['adapter'] = adapter;
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
  attendees: [],
  record: false,
  chat: false
};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sessions: any;
  constructor() {
    ConnectyCube.init(CREDENTIALS, appConfig);
    const userProfile = {
      login: "kelubboy",
      password: "kelubboy2022#"
    };
    
    ConnectyCube.createSession().then((session: any) => {
        this.sessions = session;
        localStorage.setItem("ConnectyCube:session", JSON.stringify(session));
        ConnectyCube.setSession(session);
        ConnectyCube.login(userProfile)
          .then((user) => {
            console.log(user)
          })
          .catch((error) => {});
      })
      .catch((error) => {
      });
  }

  start() {
    try {
      ConnectyCube.meeting.create(params)
      .then((meeting: any) => {
        const confRoomId = meeting._id;
        const session: any = ConnectyCube.videochatconference.createNewSession();
        console.log(session)
        const mediaParams = {
          audio: true,
          video: { width: 1280, height: 720 }
        };
        
        session.getUserMedia(mediaParams)
          .then((localStream) => {
            console.log(session)
            console.log(meeting);
            console.log(localStream);
            session.attachMediaStream("videostream", localStream, {
              muted: true,
              mirror: true,
            });
          })
          .catch((error) => {
            throw new Error(error)
          });
      })
      .catch(error => {
        throw new Error(error)
      });
    }catch(ex) {
      console.log(ex)
    } 
  }

}
