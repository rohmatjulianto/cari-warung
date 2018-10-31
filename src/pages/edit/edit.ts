import { Component , ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 declare var google;
@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})  
export class EditPage {
  @ViewChild('map') mapElement: ElementRef;
  maps: any;
  id:'';
  name:'';
  title:'';
  lat:'';
  lon:'';

  constructor(public navCtrl: NavController, public alertCtrl : AlertController, public navParams: NavParams, public http : HttpClient) {
    this.id = this.navParams.get('idedit');
    this.name = this.navParams.get('name');
    this.title = this.navParams.get('title');
    this.lat = this.navParams.get('lat');
    this.lon = this.navParams.get('lon');
    console.log(this.name);
  }

  ionViewDidLoad() {
    this.loadmap();
  }
  loadmap(){
    // loadingmaps in page
      let latLng = new google.maps.LatLng(this.navParams.get('lat'),this.navParams.get('lon'));
      let mapOptions = {
        center: latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      this.maps = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //marker
     let marker =  new google.maps.Marker({
        position : {
          lat: parseFloat(this.navParams.get('lat')),
          lng: parseFloat(this.navParams.get('lon'))
          
        },
        map : this.maps,
        label : {
          text : "Set location"
        },
        draggable : true
      });
    //event drag and get position into ion input 
    google.maps.event.addListener(marker,'dragend' ,() => {
      console.log(marker.position.lat());
      this.lat = marker.position.lat();
      this.lon = marker.position.lng();
      });
    //  this.lat = this.markdrag();
     
    }
  
  save(){
    let data = {
      id : this.id,
      name : this.name,
      title : this.title,
      lat : this.lat,
      lon : this.lon
    }
    if (data.name == undefined || data.title == undefined || data.lon == undefined || data.lat == undefined) {
      const alert = this.alertCtrl.create({
        title: 'fatal!!',
        subTitle: 'Periksa kembali kolom pengisian anda',
        buttons: ['OK']
      });
      alert.present();
    } else {   
      let url = "https://markmaps.000webhostapp.com/marker/edit.php";
      console.log(data);
      this.http.post(url,JSON.stringify(data)).subscribe();
      window.location.reload();
    }
  }


}
