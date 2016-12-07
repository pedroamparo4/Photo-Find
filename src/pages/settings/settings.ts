// Angular
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


// Ionic
import { NavController, ToastController, Events, ActionSheetController, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';

// Custom
import { SimpleHttp, AuthService } from '../../shared/services/include'

// 3rd Party

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(
    public navCtrl: NavController,
    public sanitizer: DomSanitizer,
    public auth: AuthService,
    public events: Events,
    private toastCtrl: ToastController,
    public httpApi: SimpleHttp,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController 
  ) {
    events.subscribe('user:authenticated', (userEventData) => {

    });
  }

  ionViewDidLoad() {
    console.log('Hello SettingsPage Page!!!!');
  }

}
