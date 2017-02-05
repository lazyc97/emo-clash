import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { Utilities, FirebaseService } from '../../services/services';

/*
  Generated class for the ResultView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-result-view',
  templateUrl: 'result-view.html'
})
export class ResultViewPage {

  emotion: any;
  postKey: string;
  postedOn: string;
  score: number;
  img: string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public firebaseService: FirebaseService) {

    this.emotion = this.navParams.data.emotion;
    this.postKey = this.navParams.data.postKey;
    this.postedOn = '-';
    this.score = 0;

    this.firebaseService
      .getImageUrl(this.emotion.emo, this.postKey)
      .then(url => this.img = url);

    this.firebaseService
      .getPostData(this.emotion.emo, this.postKey)
      .then(
        data => {
          let val = data.val();
          this.postedOn = moment(val.postedOn).format('MMMM Do YYYY, h:mm:ss a');
          this.score = val.score;
        },
        err => Utilities.errorMessageAlert(err.message, this, true)
      );
  }
}
