import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent } from './resetpassword.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule,
    ResetpasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ResetpasswordComponent],

})
export class ResetpasswordModule { }
