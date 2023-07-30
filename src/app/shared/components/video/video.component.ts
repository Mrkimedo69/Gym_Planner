import { Component, OnInit, Input } from '@angular/core';
import packageInfo  from 'package.json';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit{

  @Input() videoUrl : string;

  id :string
  playerVars = {
    cc_lang_pref: 'en',
  };
  version = '...';
  private player;
  public ytEvent;
  constructor() {
    this.version = packageInfo.version.replace( '^','')
  }

  ngOnInit(): void {
      this.id = this.videoUrl.split('/watch?v=').pop();
      
  }

  onStateChange(event) {
    this.ytEvent = event.data;
  }
  savePlayer(player) {
    this.player = player;
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }
}
