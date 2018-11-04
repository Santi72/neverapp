import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { UserModel } from '../../models/user-model';
import { ProductoModel } from '../../models/producto-model';

import { AuthProvider } from '../../providers/auth/auth';
import { ListaProvider } from '../../providers/lista/lista';

import { SigninPage } from '../signin/signin';
import { HomePage } from '../home/home';

import { ToastController } from 'ionic-angular';

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
              public authService: AuthProvider,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              private toastCtrl: ToastController) {

              this.userModel = new UserModel();
  }

  signUp(){

    let loading = this.loadingCtrl.create({
      content: 'Creando lista, por favor espera...'
    });

    loading.present();

    this.authProvider.CrearUsuarioConEmailAndPassword(this.userModel).then( result =>{

      this.userModel.uid = this.authService.UsuarioActual();

      console.log("signUp() - this.userModel.uid:: "+this.userModel.uid);

      // No hace falta crear una lista al principio de logarse, ya tengo el uid
      // al crear el primer Producto creo la lista

/*       this.listaprov.nuevaLista(this.userModel) 
        .subscribe(data => {

        }); 
 */
      console.log("signUp() - SE HA REGISTRADO:: " + JSON.stringify(this.userModel)) 
      this.listaprov.guardarStorage(this.userModel); 
     
      loading.dismiss();

      this.mostrarToastAlta("Se ha creado la lista correctamente");

      this.navCtrl.setRoot(HomePage);

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

  mostrarToastAlta(message: string){
      const toast = this.toastCtrl.create({
        message: message,
        duration: 2500
      });
      toast.present();    

  }

}
