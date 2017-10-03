import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class CognitiveApi {

  // Microsoft Cognitive Service API key & Url
  private static apiKey = process.env.MicrosoftEmotion;
  private static apiUrl = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';

  // Header for requests
  private headers = new Headers();

  constructor(public http: Http) {

    this.headers.append('Content-Type', 'application/octet-stream');
    this.headers.append('Ocp-Apim-Subscription-Key', CognitiveApi.apiKey);
  }

  scoreImage(emo: string, buffer) {
    return this.http.post(CognitiveApi.apiUrl, buffer, { headers: this.headers })
      .map(res => {
        let faceList = res.json();
        if (faceList.length === 0) return 0;
        return faceList[0]['scores'][emo] * 100;
      });
  }
}
