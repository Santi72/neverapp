import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { UserModel } from '../../models/user-model';

import { AuthProvider } from '../../providers/auth/auth';
import { ListaProvider } from '../../providers/lista/lista';



@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  userModel: UserModel;
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public listaProv: ListaProvider)  {

    this.userModel = new UserModel(); 
  }

  signIn() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.LogarseConEmailPassword(this.userModel).then(result => {
      
      this.listaProv.guardarStorage(this.userModel);
      console.log("INICIO - SE HA LOGADO:: " + JSON.stringify(this.userModel) )
     
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
