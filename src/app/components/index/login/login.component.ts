import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart,Router} from '@angular/router';
// import UIkit from '../../../node_modules/uikit/dist/js/uikit-core';

// import {UIkit} from '../../../../../node_modules/uikit/dist/js/uikit-core'
import { NgModule }      from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public isActive: boolean = true;
  public loading: boolean = false;

  Formlogin: FormGroup;
  FormResetPass: FormGroup;


  constructor(private _formBuilder: FormBuilder,private AuthService: AuthService) {}
  
   

 public eye(){
    this.isActive = !this.isActive;

 }

 
  ngOnInit() {
    this.Formlogin = this._formBuilder.group({
      email: [null, Validators.compose([
                                        Validators.required, 
                                        Validators.email,
                                        Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                                        Validators.maxLength(30),
                                        Validators.minLength(6)])
                                      ], 
      password: [null, Validators.compose([
                                          Validators.required,
                                          // Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                                          Validators.maxLength(30),
                                          Validators.minLength(6)])
                                        ],
    rememberLogin :[null]
    })
    this.FormResetPass = this._formBuilder.group({
      email: [null, Validators.compose([
                                        Validators.required, 
                                        Validators.email,
                                        Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                                        Validators.maxLength(30),
                                        Validators.minLength(6)])
                                      ], 
    })
  }

  myLogin(){
    this.loading = !this.loading;
    setTimeout(
      ()=>{    this.loading = !this.loading;
    },2000)
    const email = this.Formlogin.controls['email'].value ;
    const password = this.Formlogin.controls['password'].value ;
    const rememberLogin = this.Formlogin.controls['rememberLogin'].value ;
    this.AuthService.login(email,password,rememberLogin);

  }
}





