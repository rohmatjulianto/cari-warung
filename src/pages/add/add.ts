import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  @ViewChild('map') mapElement: ElementRef;
    maps: any;
        lat : any;
        lon : any;
        name : any;
        title : any;
        id ='';
  constructor(public navCtrl: NavController, public navParams: NavParams, public http : HttpClient ,public alertCtrl: AlertController ) {
   
  }
ionViewDidEnter(){
  this.loadmap();
}
  loadmap(){  
  // loadingmaps in page
    let latLng = new google.maps.LatLng(-6.2371224,106.8439346);
    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.maps = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //marker
   let marker =  new google.maps.Marker({
      position : {
        lat: -6.2371224,
        lng: 106.8439346
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
   
  }

  save(){
    let data = {
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
      let url = "https://markmaps.000webhostapp.com/marker/save.php";
      console.log(data);
      this.http.post(url,JSON.stringify(data)).subscribe();
      window.location.reload();
    }
  }

}
