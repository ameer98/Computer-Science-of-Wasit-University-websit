import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage'
import { Observable  } from 'rxjs';
import { finalize} from 'rxjs/operators';
import UIkit from 'uikit'
import * as XLSX from 'xlsx';
import { utils, write, WorkBook } from 'xlsx';
import * as firebase from 'firebase'; // for typings
import { AngularFireAuth } from '@angular/fire/auth'
import { HostListener } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ref : AngularFireStorageReference;
  task:AngularFireUploadTask;
  downloadURL :Observable<string>;
  imageURL:string;
  notific : Boolean = true;
  sli:Boolean = false;
  WidthScreen :Number = 0 ;
  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    
    if(window.innerWidth <= 768){
           this.sli = false

    }
    else
        this.sli = true

  }


  constructor(private fsor:AngularFireStorage,public afAuth: AngularFireAuth ,private AuthService:AuthService) {
   
  }
   slid(){
     this.sli = !this.sli
     console.log("SDF"+  this.sli)
   }

 
ngAfterViewInit(){

}
  ngOnInit() {
    this.innerWidth = window.innerWidth;
      window.innerWidth <= 760 ? this.sli = false : this.sli = true;

      // console.log('Width Screen'+ this.innerWidth)

  
  }


 logout(){
  this.AuthService.logout()
}
  
  

}
