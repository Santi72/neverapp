
import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { UserModel } from '../../models/user-model';


@Injectable()
export class AuthProvider {

  user: User;

  constructor(public angularFireAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');

    angularFireAuth.authState.subscribe( (user: User) => {
      this.user = user;
    })

  }

  get authenticated():boolean{
    return this.user != null;
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
