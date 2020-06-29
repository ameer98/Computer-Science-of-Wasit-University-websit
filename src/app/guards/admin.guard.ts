import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate,UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private AuthService :AuthService,public router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const ruleLocal = localStorage.getItem('rule');
      const ruleSession = sessionStorage.getItem('rule');

      if(this.AuthService.isAuth() &&((ruleLocal == 'admin')||(ruleSession == 'admin')) ){
      // console.log("realy login")
      this.router.navigate(['/admin/'])
      return true;
      }else{
        this.router.navigate(['/home'])
        return false
      }

  }
}
