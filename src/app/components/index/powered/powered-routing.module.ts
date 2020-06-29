import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoweredComponent } from './powered.component';

export const PoweredRoutes:Routes = [
  {
    path: '',
    component: PoweredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(PoweredRoutes)],
  exports: [RouterModule]
})
export class PoweredRoutingModule { }
