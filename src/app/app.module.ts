import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Geolocation } from "@ionic-native/geolocation";
import { HttpClientModule } from "@angular/common/http";

import { AboutPage } from '../pages/about/about';
import { AddPage } from "../pages/add/add";
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EditPage } from '../pages/edit/edit';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    AboutPage,
    HomePage,
    TabsPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    AboutPage,
    HomePage,
    TabsPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
