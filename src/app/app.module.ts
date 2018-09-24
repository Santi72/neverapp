import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { ProductoPage } from '../pages/index.paginas';


//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Providers
import { AuthProvider } from '../providers/auth/auth';
import { ListaProvider } from '../providers/lista/lista';

import { KeysPipe } from '../pipes/keys/keys';

//Plugins
import { IonicStorageModule } from '@ionic/storage';


export const firebaseConfig = {
  apiKey: "AIzaSyChzkAbe5Z7jvDKzeUgnRyi9JwchtlsJ78",
  authDomain: "neverapp-c21a5.firebaseapp.com",
  databaseURL: "https://neverapp-c21a5.firebaseio.com",
  projectId: "neverapp-c21a5",
  storageBucket: "neverapp-c21a5.appspot.com",
  messagingSenderId: "843749724793"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ProductoPage,
    KeysPipe    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SigninPage,
    ProductoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ListaProvider
  ]
})
export class AppModule {}
