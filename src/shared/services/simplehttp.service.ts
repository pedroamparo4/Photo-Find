// Angular
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

// 3rd parties
import 'rxjs';

@Injectable()
export class SimpleHttp {
  public dummyUserId: string = 'facebook|398298257168429';
  constructor(private http: Http, 
              private authHttp: AuthHttp) {
  }

  get() {
    return this.http.get('https://randomuser.me/api/?results=10')
      .map((response: Response) => {
        return response.json();
      });
  }

  post(data) {
    var params = 'pic=' + data
      + '&userid=' + this.dummyUserId;
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post('http://9c917b111196.ngrok.io', params, {headers: headers})
      .map((response: Response) => {
        return response.json();
      });
  }

  requestLoginFacebook() {
    return this.http.get('https://randomuser.me/api/?results=10')
      .map((response: Response) => {
        return response.json();
      });

  }

  myPictures() {
    console.log('auth get');
    return this.authHttp.get('https://randomuser.me/api/?results=10')
      .map((response: Response) => {
        console.log('response', response);
        return response.json();
      });
  }

  fetchPicturesByTag(tag) {
    var params = tag;
    var headers = new Headers();
    console.log('auth get');
    return this.authHttp.get('https://randomuser.me/api/?results=10')
      .map((response: Response) => {
        console.log('response', response);
        return response.json();
      });
  }

}
