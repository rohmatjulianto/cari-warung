import { Component , ViewChild, ElementRef } from '@angular/core';
import { NavController , AlertController, ModalController, ViewController} from 'ionic-angular';

import "rxjs/add/operator/map";
import { Geolocation } from "@ionic-native/geolocation";
import { HttpClient } from '@angular/common/http';

import { AddPage } from "../add/add";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  ionViewDidEnter(){
  this.navCtrl.getActive()
    console.log('reload')
    }
  @ViewChild('map') mapElement: ElementRef;
  maps: any;
  myloc : any;

  constructor(public navCtrl: NavController,
              public http : HttpClient ,
              public geolocation : Geolocation , 
              public alertCtrl: AlertController,
              public modalCtrl : ModalController,
            public viewCtrl : ViewController) {
              
                
  }

  
  ionViewDidLoad() {
    this.loadmap();
    this.getWarteg();
  }
  loadmap(){
      let latLng = new google.maps.LatLng(-6.2371224,106.8439346);
      let mapOptions = {
        center: latLng,
        zoom: 14,
        enableHighAccurancy : true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      this.maps = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }
  getWarteg(){
    this.http.get('https://markmaps.000webhostapp.com/marker/mark.php')
    .subscribe(data => {
      this.addMarker(data);
      // console.log(data);
    });
  }
  addMarker(markers){
    let iconmark = 'http://markmaps.000webhostapp.com/assets/warteg.png'
    for (let marker of markers){
      let loc = {lat : parseFloat(marker.lat),lng : parseFloat(marker.lon)}
      // console.log(loc);
      new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position : loc,
        map : this.maps,
        icon : iconmark,
        label : {
          color : 'blue',
          text : marker.name
        }
      });
    }
  }
  adddata(){
    const prompt = this.modalCtrl.create(AddPage);
    return prompt.present();
  }
}
