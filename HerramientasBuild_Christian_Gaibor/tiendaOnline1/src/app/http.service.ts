import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {auth} from 'firebase/app';


@Injectable()
export class HttpService {
  
  constructor(private afsAuth:AngularFireAuth) { }

  registerUser(){}

  loginEmailUser(email:string, pass:string){
    return new Promise((resolve,reject)=>{
      this.afsAuth.auth.signInWithEmailAndPassword(email,pass)
      .then(userData=>resolve(userData),
      err=>reject(err));
    })
  }

  loginFacebookUser(){}

  loginGoogleUser(){
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logOutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth=>auth));
  }

}
