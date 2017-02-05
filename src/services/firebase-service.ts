import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Utilities, CognitiveApi } from "./services";
import { ApiKeys } from './api-keys';

@Injectable()
export class FirebaseService {

  constructor(public cognitiveApi: CognitiveApi) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

  // Get posts with highest scores
  getTopPosts(emo: string) {
    return firebase.database()
      .ref(emo)
      .orderByChild('score')
      .limitToLast(10)
      .once('value');
  }

  getPostData(emo: string, postKey) {
    return firebase.database()
      .ref(`${emo}/${postKey}`)
      .once('value');
  }

  updatePostData(emo: string, postKey, postData) {
    return firebase.database()
      .ref(`${emo}/${postKey}`)
      .update(postData);
  }

  getImageUrl(emo: string, postKey) {
    return firebase.storage()
      .ref(`${emo}/${postKey}.jpg`)
      .getDownloadURL();
  }

  makePost(emo: string, imgBase64: string, callback = null) {

    // Generate unique ID for new post
    let newKey = firebase.database().ref(emo).push().key;

    // Score Image
    this.cognitiveApi
      .scoreImage(emo, Utilities.base64ToBuffer(imgBase64))
      .subscribe(score => {

        // Upload file to firebase storage
        firebase.storage()
          .ref(`${emo}/${newKey}.jpg`)
          .putString(imgBase64, 'base64')
          .then(() => {

            // Update database
            this.updatePostData(emo, newKey, {
              postedOn: firebase.database.ServerValue.TIMESTAMP,
              score: score
            }).then(() => {

              // Call callback() when done
              if (callback) callback(newKey);
            });
          });
      });
  }
}
