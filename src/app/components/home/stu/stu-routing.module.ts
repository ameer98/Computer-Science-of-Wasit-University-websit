import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StuComponent } from './stu.component';


const Sturoutes: Routes = [
  {
    path : '' , component : StuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(Sturoutes)],
  exports: [RouterModule]
})
export class StuRoutingModule { }
