import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StuRoutingModule } from './stu-routing.module';
import { StuComponent } from './stu.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [StuComponent],
  imports: [
    CommonModule,
    StuRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [StuComponent],
  providers:[FormBuilder]

})
export class StuModule { }
