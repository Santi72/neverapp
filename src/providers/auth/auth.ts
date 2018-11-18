
import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserModel } from '../../models/user-model';


@Injectable()
export class AuthProvider {

  user: User;

  constructor(public angularFireAuth: AngularFireAuth) {
   

     angularFireAuth.authState.subscribe( (user: User) => {
      this.user = user;
    }) 

  }


  get authenticated():boolean{
    console.log("User:: "+this.user);
    this.UsuarioActual();
    return this.user != null;
  }

  UsuarioActual(){
    var user = this.angularFireAuth.auth.currentUser;

    if (user) {
      // User is signed in.
      console.log("Current user:: " + user.uid);

    } else {
      // No user is signed in.
      console.log("Sin Current user! ");
      return null;
    }
    return user.uid;
  }

  LogarseConEmailPassword(userModel: UserModel) : Promise<any>{

    return this.angularFireAuth.auth.signInWithEmailAndPassword(userModel.email, userModel.password)

  }
  CrearUsuarioConEmailAndPassword( userModel: UserModel): Promise<any>{

    return this.angularFireAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password)
  

  }

  signOut(): Promise<any>{
    return this.angularFireAuth.auth.signOut();
  }

  

}
