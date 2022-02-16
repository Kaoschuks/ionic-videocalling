import { Component, OnInit } from '@angular/core';
import { initLiveStream, attachCamera, detachCamera } from '@cloudinary/js-streaming';
let publicId;

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  cloudinary: any = {
    name: 'kaoschuks',
    url: 'https://api.cloudinary.com/v1_1/kaoschuks/image/upload/',
    upload_preset: 'bk7wobrc'
  }
  stream_control: any 
  url: string = ''
  
  constructor() { }

  ngOnInit() {
    initLiveStream({
      cloudName: this.cloudinary.name,
      uploadPreset: this.cloudinary.upload_preset,
      debug: "all",
      hlsTarget: true,
      fileTarget: true,
      events: {
          start: (args: any) => {
              // user code
              console.log(args)
              document.getElementById("stream_video")
          },
          stop: (args: any) => {
            // user code
            console.log(args)
            document.getElementById("stream_video")
          },
          error: (args: any) => {
            // user code
            console.log(args)
          },
          local_stream: (stream: any) => {
            this.stream_control.attach(document.getElementById("stream_video"), stream);
          }
      }
    }).then(result => {
      // keep handle to instance to start/stop streaming
      this.stream_control = result;
      publicId = result.response.public_id;
    });
  }

  start_stream() {
    this.stream_control.start(publicId);
    document.getElementById("user_video").style.display = 'none';
    document.getElementById("stream_video").style.display = 'block';
  }

  stop_stream() {
    this.stream_control.stop(publicId);
  }

  view_stream() {
    this.stop_stream()
    document.getElementById("stream_video").style.display = 'none';
    document.getElementById("user_video").style.display = 'block';
    document.getElementById("user_video").setAttribute("src", this.url);
  }

}
