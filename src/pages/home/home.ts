import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
import { ProductoPage } from '../index.paginas';
import { ListaProvider } from '../../providers/lista/lista';
import { UserModel } from '../../models/user-model';
import { ProductoModel } from '../../models/producto-model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {

  userModelVacio: UserModel;  
  productos: ProductoModel;

 
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public listaProv: ListaProvider,
              private menuCtrl: MenuController
              ) {
         
        console.log("Home constructor");


            
  }

  ionViewWillEnter(){
 
    this.verLista();
    
  }

  mostrarMenu(){
    this.menuCtrl.toggle();
  }



  verLista(){
    console.log("verLista");
    

    this.listaProv.cargarStorage().then(() => {
      this.listaProv.getListado(this.listaProv.userModel)
        .subscribe(data => {
          console.log(data);
          this.productos = data;

        });
    });

    this.menuCtrl.close();

  }

  signOut(){
    this.authProvider.signOut();

    this.userModelVacio = new UserModel();  // Vacio el storage
    this.listaProv.guardarStorage(this.userModelVacio);

    this.navCtrl.setRoot(SigninPage);    
  } 

  apuntarProducto(){ 
    this.navCtrl.push(ProductoPage);
  }

  tacharProducto(tachado: boolean,  k: string ){
    console.log("Tachar el producto: (echar al carrito) " + k);


     this.listaProv.cargarStorage().then(() => {
      this.listaProv.actualizarProducto(tachado, k )
        .subscribe(data => {
          this.verLista();
        }); 

    });  


  }


}
