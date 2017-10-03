import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage, ResultViewPage, EmotionHomePage } from '../pages/pages';
import { CognitiveApi, FirebaseService } from '../services/services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultViewPage,
    EmotionHomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultViewPage,
    EmotionHomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    CognitiveApi,
    FirebaseService
  ]
})
export class AppModule {}
