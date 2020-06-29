import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { CertificateComponent } from './certificate/certificate.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { StuComponent } from './stu/stu.component';
import { AdminGuard } from 'src/app/guards/admin.guard';



export const homeroutes: Route[] = [
  {
    path : 'admin',
    component : HomeComponent, 
    // canActivate : [AdminGuard],
    children :[
      {path : '', component : MainComponent},

      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('../home/home.module').then(m => m.HomeModule),
      // },
      {
        path: 'user',
        loadChildren: () =>
          import('../home/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'Certific',
        loadChildren: () =>
          import('../home/certificate/certificate.module').then(m => m.CertificateModule),
      },
      // {path : 'user', component : UserComponent},
    
      {
        path : '**' , redirectTo : ''
      } 
       
    ]

  },
  {
    path : 'home' , 
    canActivate : [AuthGuard],
    loadChildren: () =>
          import('../home/stu/stu.module').then(m => m.StuModule),
  },
  {
    path : '**' , redirectTo : 'home'
  } 

 

];
@NgModule({
  imports: [RouterModule.forChild(homeroutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
