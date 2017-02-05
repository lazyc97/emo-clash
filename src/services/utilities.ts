import { Camera, CameraOptions } from 'ionic-native';

export class Utilities {

  // Emotion types
  static emotionTypes = [
    {
      emo: 'anger',
      display: 'Anger'
    },
    {
      emo: 'fear',
      display: 'Fear'
    },
    {
      emo: 'happiness',
      display: 'Happiness'
    },
    {
      emo: 'sadness',
      display: 'Sadness'
    },
    {
      emo: 'surprise',
      display: 'Surprise'
    }
  ];

  // Camera Options
  static cameraOptions: CameraOptions = {
    destinationType: Camera.DestinationType.DATA_URL,
    allowEdit: false,
    correctOrientation: true,
    cameraDirection: Camera.Direction.FRONT,
    encodingType: Camera.EncodingType.JPEG
  };

  // Error Message
  static errorMessageAlert(msg: string, nav: any, toClose: boolean) {
    nav.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Close',
          handler: () => {
            if (toClose) nav.navCtrl.pop();
          }
        }
      ]
    }).present();
  }

  // base64 -> buffer
  static base64ToBuffer(base64) {
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }
}
