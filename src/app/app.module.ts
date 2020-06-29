import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IndexRoutingModule } from './components/index/index-routing.module';
import { IndexModule } from './components/index/index.module';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './components/home/home-routing.module';
import { HomeModule } from './components/home/home.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';;
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import{AngularFireStorageModule } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { SetpassGuard } from './guards/setpass.guard';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    IndexRoutingModule,
    IndexModule,
    HomeRoutingModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireStorageModule,
    
   
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard,
    SetpassGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
