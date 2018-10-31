import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor( public navCtrl : NavController) {
    
  }

  ionViewWillEnter(){
  // this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
  clickhome(){
     this.navCtrl.setRoot(this.navCtrl.getActive().component);
     console.log('this page reloaded')
  }
}
