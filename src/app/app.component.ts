import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';

import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';

import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  public items: Observable<any[]>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              authProvider: AuthProvider,
              ) {


    if (authProvider.authenticated) {
      this.rootPage = HomePage;
    } else {     
      this.rootPage = HomePage;
 // Prov =SigninPage
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


  }
}

