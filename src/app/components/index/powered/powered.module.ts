import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoweredRoutingModule } from './powered-routing.module';
import { PoweredComponent } from './powered.component';


@NgModule({
  declarations: [PoweredComponent],
  imports: [
    CommonModule,
    PoweredRoutingModule
  ]
})
export class PoweredModule { }
