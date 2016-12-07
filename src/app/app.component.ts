import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';

import { SimpleHttp, AuthService } from '../shared/services/include'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  authenticated: boolean = false;
  rootPage = TabsPage;
  settingsPage = SettingsPage;
  constructor(
    platform: Platform,
    public menuCtrl: MenuController,
    public httpApi: SimpleHttp,
    public auth: AuthService
  ) {
    this.enableAuthenticatedMenu();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.auth.startupTokenRefresh();

      console.log('Hello from TypeScript');
    });
  }

  goToSettingsPage()
  {
       this.nav.push(this.settingsPage);
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  enableAuthenticatedMenu() {
    this.menuCtrl.enable(this.authenticated, 'authenticated');
    this.menuCtrl.enable(!this.authenticated, 'unauthenticated');
  }

  logInToFacebook() {
    this.authenticated = true;
    this.menuCtrl.close('unauthenticated');
    this.enableAuthenticatedMenu();
    console.log('Logging In!');
  }

  logOutFromFacebook() {
    this.authenticated = false;
    this.menuCtrl.close('authenticated');
    this.enableAuthenticatedMenu();
    console.log('Logging Out!');
  }

}
