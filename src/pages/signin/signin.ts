import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';


import { SignupPage } from '../signup/signup';
import { UserModel } from '../../models/user-model';

import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  userModel: UserModel;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthProvider)  {
    this.userModel = new UserModel(); 
  }

  signIn() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.LogarseConEmailPassword(this.userModel).then(result => {
      loading.dismiss();

      this.navCtrl.setRoot(HomePage);
      
    }).catch(error => {
      loading.dismiss();

      console.log(error);
      this.alert('Info', 'Ha ocurrido un error o aún no se ha logado. Por favor intente nuevamente o registrese.');
    });
  }

  signUp() {
    this.navCtrl.push(SignupPage);
  }

  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
