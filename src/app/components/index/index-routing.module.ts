import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { IndexComponent } from './index.component';
import { MainComponent } from './main/main.component';
import { LoginGuard } from 'src/app/guards/login.guard';
import { SetpassGuard } from 'src/app/guards/setpass.guard';



export const indexroutes: Route[] = [
  {
    path : '',
    component : IndexComponent,
    canActivate: [LoginGuard],
    children :[
      {
        path: '',
        loadChildren: () =>
          import('../index/main/main.module').then(m => m.MainModule),
      },
      {
          path: 'login',
          loadChildren: () =>
            import('../index/login/login.module').then(m => m.LoginModule),
        },

        {
          path: 'powered',
          loadChildren: () =>
            import('../index/powered/powered.module').then(m => m.PoweredModule),
            
        },
        {
          path: 'setPassword' ,
          loadChildren: () =>
      import('../index/login/resetpassword/resetpassword.module').then(m => m.ResetpasswordModule),
      canActivate: [SetpassGuard],

        },
        {
          path: 'resources',
          loadChildren: () =>
            import('../index/pdf/pdf.module').then(m => m.PdfModule),
        },
        {
          path: 'teachers',
          loadChildren: () =>
            import('../index/profiler/profiler.module').then(m => m.ProfilerModule),
        },
        
        // {
        //   path : '**' , redirectTo : ''
        // }
         
    ]
    ,


  },
  // { path: '**' ,   redirectTo: '', pathMatch: 'full' },


];
@NgModule({
  imports: [RouterModule.forChild(indexroutes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
