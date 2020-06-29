import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [UserComponent],
  providers:[FormBuilder]
})
export class UserModule { }
