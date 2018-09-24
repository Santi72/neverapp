import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { UserModel } from '../../models/user-model';
import { ProductoModel } from '../../models/producto-model';

import { AuthProvider } from '../../providers/auth/auth';
import { ListaProvider } from '../../providers/lista/lista';

import { SigninPage } from '../signin/signin';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userModel: UserModel;
  productoModel: ProductoModel;

  constructor(private listaprov: ListaProvider,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider) {

              this.userModel = new UserModel();
  }

  signUp(){

    let loading = this.loadingCtrl.create({
      content: 'Creando cuenta, por favor espere...'
    });

    loading.present();

    this.authProvider.CrearUsuarioConEmailAndPassword(this.userModel).then( result =>{

      this.listaprov.nuevaLista() 
        .subscribe(data => {
          
        }); 

      console.log("INICIO - SE HA REGISTRADO:: " + JSON.stringify(this.userModel)) 
      this.listaprov.guardarStorage(this.userModel); 
     
      loading.dismiss();

      this.navCtrl.push(HomePage);

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
