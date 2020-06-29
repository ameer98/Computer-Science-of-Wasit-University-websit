import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { indexroutes } from './components/index/index-routing.module';
import { homeroutes } from './components/home/home-routing.module';


export const routes: Routes = [];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
