import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router ,ActivatedRoute, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SetpassGuard implements  CanActivate{
  newUser:String
    constructor(public router:Router,public route:ActivatedRoute){
      this.newUser = sessionStorage.getItem('newUser');
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this.newUser ===null ){
        this.router.navigate(['/']) ;
        return false ;
      }
      else{
        if(firebase.auth().currentUser.metadata.creationTime ===firebase.auth().currentUser.metadata.lastSignInTime)
        {
          return true ;
        }
        else{
          return false ;
        }
      }
    }
}
