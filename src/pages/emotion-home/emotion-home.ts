import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { FirebaseService } from '../../services/services';
import { Utilities } from '../../services/utilities';
import { ResultViewPage } from '../pages';

/*
  Generated class for the EmotionHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-emotion-home',
  templateUrl: 'emotion-home.html'
})
export class EmotionHomePage {

  emotion: any;
  topPosts = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public firebaseService: FirebaseService) {

    this.emotion = this.navParams.data;

    let loader = this.loadingCtrl.create({ content: 'Getting Data...' });
    loader.present();

    this.firebaseService
      .getTopPosts(this.emotion.emo)
      .then(
        data => {
          if (data.val()) {
            let tmp = [];
            data.forEach(item => { tmp.push({val: item.val(), key: item.key}); });
            this.topPosts = tmp.reverse();
          }

          loader.dismiss();
        },
        err => {
          loader.dismiss();
          Utilities.errorMessageAlert(err.message, this, true);
        });
  }

  viewPost(key) {
    this.navCtrl.push(ResultViewPage, {
      emotion: this.emotion,
      postKey: key
    });
  }

  compete() {
    Camera.getPicture(Utilities.cameraOptions)
      .then(imgBase64 => {

        // Create loader
        let loader = this.loadingCtrl.create({content: 'Scoring...'});
        loader.present();

        // Score image and upload to server
        this.firebaseService
          .makePost(this.emotion.emo, imgBase64,
            key => {
              loader.dismiss();
              this.navCtrl.push(ResultViewPage, {
                emotion: this.emotion,
                postKey: key
              });
            });
        });
  }
}
