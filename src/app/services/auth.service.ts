import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase, AngularFireList ,AngularFireObject } from '@angular/fire/database';

import { Router } from '@angular/router';
import UIkit from 'uikit'
import * as firebase from 'firebase';

import { map } from 'rxjs/operators';
import { Users } from './user/users.service';
import { Observable } from 'rxjs';
import { async } from 'q';
// import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  itemList: AngularFireList<any>
  itemArray :  Array<any>;
  user$: Observable<Users>;
    public loggedIn ;
  isLogin : boolean =false
  isLoginSuccessed  : boolean =false
  authState:any ;
  authUser
suser ; 
stat = null
actionCodeChecked: boolean;
actionCode: string;
uid

  constructor(private fbAuth: AngularFireAuth ,public router:Router , public db :AngularFireDatabase) {
   
 

  
  }

async loginStatus(): Promise<boolean> {
  return new Promise((resolve,reject) => {
    const auth = firebase.auth()
    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
 })
}

async checkLoginStatus(): Promise<Boolean> {
  if (await this.loginStatus) {
    console.log("true"+true)
    return true ;
    }
   else {
    console.log("false"+false)

    return false;
  }
}
isAuth(){
  const luserData = localStorage.getItem('userData');
  const suserData = sessionStorage.getItem('userData');
    // console.log(userData);
    if ((suserData && suserData.length > 0) || (luserData && luserData.length > 0)) {
      return true;
    } else {
      return false;
    }
}


  login(email,password,rememberLogin){

    this.fbAuth.signInWithEmailAndPassword(email,password)
    .then(async user =>{
      UIkit.notification({message: `Success login `, status: 'success',timeout :100000})      
      console.log(user.user.refreshToken)
      rememberLogin ===true ? await localStorage.setItem('userData', user.user.refreshToken) :  await sessionStorage.setItem('userData', user.user.refreshToken)

     
      this.uid = firebase.auth().currentUser.uid ;
console.log(this.uid)
     

 

      
      console.log("emailVerified"+user.user.emailVerified)
    
      // this.db.database.ref(`users/${nameUser}`).update({lastLogin: new Date().valueOf()});

      if (
        firebase.auth().currentUser.metadata.creationTime ===firebase.auth().currentUser.metadata.lastSignInTime
      ) {
        sessionStorage.setItem('newUser', JSON.stringify(user.user.uid))
        // user.user.sendEmailVerification()
        this.router.navigate(['/setPassword'])
        console.log("first login set setPassword")


      } else {
        this.router.navigate(['home'])

      }
      



    }).then(

    )
    .catch(error=>{
      UIkit.notification({message: `${error}`, status: 'danger',timeout :10000000}) 
    })

 

  }
  
   stringify (x) {
    console.log(JSON.stringify(x));
}
updatePassword(setPassword){
  console.log("Success set Password"+setPassword)
  this.router.navigate(['home'])

}


  async logout() {
    await localStorage.removeItem('userData');
    await sessionStorage.removeItem('userData');
    await localStorage.clear();
    await sessionStorage.clear();

    // localStorage.removeItem('user');
    this.loggedIn = false;
    this.fbAuth.signOut().then(
      ()=>{
        this.router.navigate([''])
        console.log('signOut')
      }
    
    );
    
}
}



 





