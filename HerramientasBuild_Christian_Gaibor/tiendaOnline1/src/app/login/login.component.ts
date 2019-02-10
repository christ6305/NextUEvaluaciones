import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Response } from '@angular/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	model: any = {};
	loading = false;
  returnUrl: string;
  error:string;

  constructor(public afAuth:AngularFireAuth,private router: Router,private authService: HttpService) { }
  public email:string='';
  public password:string='';

  ngOnInit() {
  }

  onLogin():void{
    this.authService.loginEmailUser(this.email,this.password)
    .then((res)=>{
      this.onLoginRedirect();
    }).catch(err=>console.log('err',err.message));
  }

  onLogingGoogle():void{
    this.authService.loginGoogleUser()
    .then((res)=>{
      console.log('resUser',res);
      this.onLoginRedirect();
    }).catch(err=>console.log('err',err.message));
  }

  onLogout(){
    this.authService.logOutUser();
  }

  onLoginRedirect():void{
    this.router.navigate(['dash']);
  }
}
