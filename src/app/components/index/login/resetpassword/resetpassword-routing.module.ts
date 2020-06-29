import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetpasswordComponent } from './resetpassword.component';


export const reSPRoutes:Routes = [
  {
    path: '',
    component: ResetpasswordComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(reSPRoutes)],
  exports: [RouterModule]
})
export class ResetpasswordRoutingModule { }
