import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Utilities } from '../../services/services';
import { EmotionHomePage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public emotionTypes = Utilities.emotionTypes;

  constructor(public navCtrl: NavController) {
  }

  pickEmotionType(emotion) {
    this.navCtrl.push(EmotionHomePage, emotion);
  }

  getImageLink(emo) {
    return `assets/emotions/${emo}.png`;
  }
}
