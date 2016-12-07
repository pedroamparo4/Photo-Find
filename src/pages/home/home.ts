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
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  search:string;
  public photos: any;
  public test: boolean = false;
  public base64Image: string;
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
      this.test = true;
      // userEventData is an array of parameters, so grab our first and only arg
      console.log('Welcome', userEventData);
      this.presentToast();
    });
  }


    makeTagSearch() {
    this.httpApi.fetchPicturesByTag(this.search).subscribe(
      data => {
  console.log('success');
        console.log('data', data.results);
        this.photos = data.results;
      },
      err => {
        // Uh Oh
        console.log('err', err);
      },
      () => {
        console.log('complete');
      });
  }

  fetchMyPhotos() {

 this.httpApi.myPictures().subscribe(
      data => {
        console.log('success');
        console.log('data', data.results);
        this.photos = data.results;

      },
      err => {
        // Uh Oh
        console.log('err', err);
      },
      () => {
        console.log('complete');
      });
  }

  takePicture() {
    // getPicture options
    let options = {
      quality: 75,
      //destinationType: Camera.DestinationType.FILE_URI,
      destinationType: Camera.DestinationType.DATA_URL,
      //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = "data:image/jpeg;base64," + imageData;
      // this.base64Image = imageData;
      console.log('imgData', imageData);
      
      this.httpApi.post(imageData).subscribe(
        data => { console.log('POSTing on Server'); },
        err => {console.log('err', err);},
        () => { console.log('POSTed on Server'); }
      );

    }, (err) => {
      // Handle error
      console.log('err', err);
    });
  }

  ///////////////////////////////////////////////////////////////////////


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Login was successful',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('authenticated', this.auth.authenticated());
    if (this.auth.authenticated()) {
      console.log('authenticated');
      this.test = true;
    }
  }

  addImage() {
    let options = this.actionSheetCtrl.create({
      title: 'Select an Image',
      buttons: [
        {
          text: 'Camera',
          handler: () => this.handleMedia(Camera.PictureSourceType.CAMERA)
        }, {
          text: 'Photo Library',
          handler: () => this.handleMedia(Camera.PictureSourceType.PHOTOLIBRARY)
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            options.dismiss();
          }
        }
      ]
    });

    options.present();
  }

  handleMedia(sourceType) {
    // getPicture options
    let options = {
      quality: 95,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      console.log('picture selected');
      console.log('from' + sourceType);
      console.log('imgData', imageData);
      console.log('');
      
      this.httpApi.post(imageData).subscribe(
        data => { console.log('POSTing on Server'); },
        err => {console.log('err', err);},
        () => { console.log('POSTed on Server'); }
      );
      
    }, (err) => {
      // Handle error
      console.log('err', err);
    });
  }
}




