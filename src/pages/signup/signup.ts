import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserModel } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userModel: UserModel;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider) {

                this.userModel = new UserModel();

  }

  signUp(){
    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta, por favor esper...'
    });

    loading.present();

    this.authProvider.CrearUsuarioConEmailAndPassword(this.userModel).then( result =>{
      loading.dismiss();

      this.navCtrl.push(SigninPage);

    }).catch( error => {
      loading.dismiss();
      
      console.log(error);
      this.alert('Error', 'Error inesperado. Intentelo de nuevo');
    })
  }

  
  alert(title: string, message: string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });

    alert.present();

  }

}
