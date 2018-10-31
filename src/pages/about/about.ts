import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, ViewController} from 'ionic-angular';
import { AddPage } from "../add/add";

import { HttpClient, } from "@angular/common/http";
import { EditPage } from '../edit/edit';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  ionViewDidEnter(){
    this.navCtrl.getActive()
      console.log('reload')
      }
  mark : any;
  id : string;
  header: any = {};


  constructor(public navCtrl: NavController,
              public http: HttpClient,
            public modalCtrl : ModalController,
          public navParams : NavParams,
        public alertCtrl : AlertController,
      public viewCtrl : ViewController) 
  {
    this.header['Cache-Control'] = 'no-cache';
    this.http.get('https://markmaps.000webhostapp.com/marker/mark.php')
    .subscribe(data => {
      this.mark = data;
    });

  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  reloaded(){
    this.navCtrl.setRoot(TabsPage);
  }
  del(id){
    // debugger;
    let url = "https://markmaps.000webhostapp.com/marker/delete.php?id="+id;
    let data = JSON.stringify({id : id},this.header);
    this.http.post(url, data).subscribe();
    window.location.reload();
    
  }
  adddata(){
    const prompt = this.modalCtrl.create(AddPage);
    return prompt.present();
  }
  edit(item){
    const prompt = this.modalCtrl.create(EditPage, {
      idedit : item.id, 
      name : item.name, 
      title: item.title , 
      lat : item.lat, 
      lon : item.lon
    });
    return prompt.present();
  }

}
