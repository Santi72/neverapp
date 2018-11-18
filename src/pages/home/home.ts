import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
import { ProductoPage } from '../index.paginas';
import { ListaProvider } from '../../providers/lista/lista';
import { UserModel } from '../../models/user-model';
import { ProductoModel } from '../../models/producto-model';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {

  userModelVacio: UserModel;  
  productos: ProductoModel;
  loading: boolean = true;

 
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public listaProv: ListaProvider,
              private menuCtrl: MenuController,
              private alertCtrl: AlertController,
              platform: Platform
              ) {    
                
         /*      platform.registerBackButtonAction(() => {
              console.log("backPressed 1");
              //this.navCtrl.pop();
              //navCtrl.popAll();
              navCtrl.popAll();
              }, 1);   */
  }

  ionViewWillEnter(){
    this.verLista();     
  }

  mostrarMenu(){
    this.menuCtrl.toggle();
  }

  verLista(){
    this.loading = true;
   
    this.listaProv.cargarStorage().then(() => {
      this.listaProv.getListado(this.listaProv.userModel)        
        .subscribe(data => {
          
          //console.log("Antes de tardar: "+data);
          //setTimeout(() => {      // el loading es en caso de conexiones lentas. settimeOut para simularlo

          this.productos = data;          

          //}, 4000)  
          //console.log("Después de tardar: " + this.productos);

          this.loading = false;

        });
    }).catch( () =>{
      console.log("No puedo Cargar Storage!! " );
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


    if (!tachado) {
      // Si no está tachado, Tacharle
      console.log("Tachar el producto: (echar al carrito) " + k);
      this.listaProv.cargarStorage().then(() => {
        this.listaProv.actualizarProducto(tachado, k)
          .subscribe(data => {
            this.verLista();
          });
      }) 
    }else{
      // Preguntar si se quiere "destachar" o se quiere borrar definitivamente
      
        const confirm = this.alertCtrl.create({
          title: 'Eliminación',
          message: '¿Quieres borrar este producto o volver ponerlo en la lista?',
          buttons: [
            {
              text: 'Borrarlo',
              handler: () => {
                console.log("Borrar el producto: (quitar de lista) " + k);
                this.listaProv.cargarStorage().then(() => {
                  this.listaProv.eliminarProducto(k)
                    .subscribe(data => {
                      //this.verLista();
                      delete this.productos[k];  //En lugar de recargar otra vez la lista, borro del componente
                    });
                })               
              }
            },
            {
              text: 'Poner en lista',
              handler: () => {
                console.log("Tachar el producto: (echar al carrito) " + k);
                this.listaProv.cargarStorage().then(() => {
                  this.listaProv.actualizarProducto(tachado, k)
                    .subscribe(data => {
                      this.verLista();
                    });
                }) 

               
              }
            }
          ]
        });
        confirm.present();
        
      }

  }

  limpiarLista(){
   
    const confirm = this.alertCtrl.create({
      title: 'Limpiar Lista',
      message: '¿Quieres borrar los productos que ya están en el carrito?',
      buttons: [
        {
          text: 'Borrarlos',
          handler: () => {
            console.log("Borrar todos los productos tachados" ); 
            
            
            this.listaProv.cargarStorage().then(() => {
              this.listaProv.getListado(this.listaProv.userModel)
                .subscribe(data => {
   
                  this.productos = data;

                  for (let key in this.productos) {                  

                      console.log("Clave:: " + key);

                      console.log(this.productos[key].tachado);

                        if (this.productos[key].tachado){
                          this.listaProv.eliminarProducto(key)
                                  .subscribe(data => {
                                    this.verLista();
                                  })

                        }                   
                      }               

                  });
            })                   
           
          }        
        },
        {
          text: 'NO',
          handler: () => {
            console.log("No hacer nada");          

          }
        }
      ]
    });
    confirm.present();

    this.menuCtrl.close();
  
  }

}
