import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Route,ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import * as firebase from 'firebase';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  ngUnsubscribe: Subject<any> = new Subject<any>();
  
  public isActive: boolean = true;
  public loading: boolean = false;
  FormReset: FormGroup;
  em ;
  UrlVlid
  selectedId: number;


  constructor(private formBuilder: FormBuilder,private AuthService: AuthService ,public router:Router ) { 
  }
  public eye(){
    this.isActive = !this.isActive;


 }
 
  ngOnInit() {

     

    this.FormReset = this.formBuilder.group({
      setPassword: [null, Validators.compose([
                                          Validators.required, 
                                      
                                          Validators.maxLength(30),
                                          Validators.minLength(6)])
                                        ],
      confirmPassword: [null, Validators.compose([
                                        Validators.required, 
                                        
                                        Validators.maxLength(30),
                                        Validators.minLength(6)])
                                      ],                                  
    },{validator: this.checkPasswords }
    )

  }
  checkPasswords(group: FormGroup) { 
  let setPassword = group.get('setPassword').value;
  let confirmPassword = group.get('confirmPassword').value;
  return setPassword === confirmPassword ? null : { notSame: true }     
}
updatePassword(){
  const setPassword =this.FormReset.controls['setPassword'].value ;
  this.AuthService.updatePassword(setPassword)
}
}
