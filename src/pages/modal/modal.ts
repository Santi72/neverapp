import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  constructor(public viewCtrl: ViewController
              , public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

}
