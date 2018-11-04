import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { UserModel } from '../../models/user-model';

import { AuthProvider } from '../../providers/auth/auth';
import { ListaProvider } from '../../providers/lista/lista';

import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  userModel: UserModel;  
  uid: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public listaProv: ListaProvider,
    public angularFireAuth: AngularFireAuth)  {

    this.userModel = new UserModel(); 
  }

  signIn() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.LogarseConEmailPassword(this.userModel).then(result => {

      console.log("1 INICIO - SE HA LOGADO:: " + JSON.stringify(this.userModel))

      this.userModel.uid = this.authService.UsuarioActual();

      this.listaProv.guardarStorage(this.userModel);

      console.log("2 INICIO - SE HA GUARDADO:: " + JSON.stringify(this.userModel) )

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
