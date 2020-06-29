import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';;
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { UploadModel } from './upload';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  ref = firebase.storage().ref('excel');
post =[]
con
constructor(private db: AngularFireDatabase,private afs: AngularFireStorage) {
    
 }



addPost(nameTech,stage,img,title,body){
  

  console.log('addPdf' +' title:'+ title +' body:'+body +' stage:'+ stage+img)
  this.db.list(`item/${stage}/post`).push({
    teacher : nameTech,
    img :img ,
    stage:stage,
    data : new Date().valueOf(),
    body:body ,
    title : title,
  })
}
addPdf(nameTech,stage,nameSubject,course,urlpdf,urlpdf2,linkprogram){
  this.db.list(`item/${stage}/pdf`).push({
    nameTech :nameTech ,
    stage :stage ,
    nameSubject :nameSubject,
    course:course,
    urlpdf :urlpdf,
    urlpdf2 : urlpdf2,
    linkprogram :linkprogram
  })
}
uploadFile(file) {
  return new Promise((resolve) => {

  this.ref.put(file).then(function (snapshot) {
      let downloadurl = snapshot.downloadURL;
      firebase.database().ref('excelimport').child('newexcel').set({
        thaturl: downloadurl
      }).then(() => {
        
        console.log('uploaded');
        
            
        })
        
      
  });
 
  console.log(resolve())
  })  
  
  
}











}

export class poster{
  $key:String;

  body:String;

data:Date;

img:String;

stage:String;

teacher:String;

title: String;
 
}

export class pdfS{
  $key:String;
  course:String;

  nameSubject:String;
  
  nameTech:String;
  
  stage:String;
  
  urlpdf: String;
  
 
}