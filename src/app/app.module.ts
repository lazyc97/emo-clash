import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
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
    CognitiveApi,
    FirebaseService
  ]
})
export class AppModule {}
