import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home.component';
import { UserComponent } from './user/user.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CertificateComponent } from './certificate/certificate.component';


@NgModule({
  declarations: [HomeComponent,MainComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormBuilder],
  exports: [HomeComponent],

})
export class HomeModule { }
