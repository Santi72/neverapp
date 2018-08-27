import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  signIn() {
    console.log('signIn');
  }

  signUp() {
    console.log('signUp');

    this.navCtrl.push(SignupPage);
  }

}
