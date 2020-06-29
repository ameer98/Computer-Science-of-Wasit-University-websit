import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload/upload.service';
import { UsersService, Users } from 'src/app/services/user/users.service';

import * as XLSX from 'xlsx';
import { async } from 'q';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireStorage } from '@angular/fire/storage';
import UIkit from 'uikit'
import { AngularFireDatabase, AngularFireList ,AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  ref : AngularFireStorageReference;
  task:AngularFireUploadTask;
  itemList: AngularFireList<any>

  downloadURL :Observable<string>;
  imageURL:string;
  notific : Boolean = true;
  sli:Boolean = false;
  fileName : String ;
  loadingData :Boolean = true  ;

  uploadProgress
  progs
  load:Boolean= false ;
  uploads:Boolean= false ;
  student =[];
  members = [];
  StudentStage1 = [];
  StudentStage2 = [];
  StudentStage3 = [];
  StudentStage4 = [];
  admin = [];
  teacher = [];
  graduate = [];

  constructor(public db :AngularFireDatabase ,private xlservice: UploadService,private fsor:AngularFireStorage,private UsersService:UsersService) {
    this.student = [] ;
    this.StudentStage1 = [];
    this.StudentStage2 = [];
    this.StudentStage3 = [];
    this.StudentStage4 = [];
    this.admin = [];
    this.teacher = [];
    this.graduate = [];
    this.itemList = this.db.list('users')
    this.itemList.snapshotChanges()
    .subscribe(actions=>{
          actions.forEach(action=>{
            let y = action.payload.toJSON()
            y["$key"] = action.key
            if(action.payload.child('role').val()  == 'admin'){
              this.admin.push(y as Users)
            }else if (action.payload.child('role').val()  == 'teacher') {
             this.teacher.push(y as Users)
            } else if (action.payload.child('role').val()  == 'graduate') {
             this.graduate.push(y as Users)
            }
            else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage1')) {
             this.StudentStage1.push(y as Users)
            }else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage2')) {
              this.StudentStage2.push(y as Users)
             }else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage3')) {
              this.StudentStage3.push(y as Users)
             }else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage4')) {
              this.StudentStage4.push(y as Users)
             }
 })
 this.loadingData =  false

    })
    // this.uploadProgress =50;
  }
  ngOnInit() {

   var bar = document.getElementById('js-progressbar');
    UIkit.upload('.js-upload', {
 url: '',
        multiple: true,
       
        completeAll: function () {
            console.log('completeAll', arguments);

            setTimeout(function () {
                bar.setAttribute('hidden', 'hidden');
            }, 1000);

            alert('Upload Completed');
        }

    });
  }
  upload(event){
    this.load = true
    let file = event.target.files[0];
    this.fileName= file.name;
    console.log('name file' + this.fileName)
    const id = Math.random().toString(36).substring(2);
    this.ref = this.fsor.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges().subscribe(prog => {
      this.progs = Math.floor(prog)
      if(prog === 100){
        this.uploads  = true ;  
        console.log('progress'+prog)
      }
    })
    console.log(event.target.files[0])
    this.task.snapshotChanges().pipe(
      finalize(() => {
       this.ref.getDownloadURL().subscribe(url => {
         
        console.log('url '+url); 

         
       });
      //  console.log(url); 

     }))
     .subscribe();  
   

  }
  message = 'Uploading';
  showMessage: boolean = false;
  // fileChange(event): void {
    
  //   const fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     const file = fileList[0];
  //     this.showMessage = true;
  //     console.log(file)
  //     // this.xlservice.uploadFile(file).then(() => {
  //     //   this.message = 'stored';
  //     // })
  //   }
  // }
  fileChange (event) {
   let rowObj =[]
let itemArray = []
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function (){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});

        wb.SheetNames.forEach(function(sheetName){
        var rowObj =  XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        // var jsonObj = JSON.stringify(rowObj);
        // var jsonObj = JSON.parse(JSON.stringify(rowObj))
        // console.log(jsonObj)
        console.log(rowObj.length);
        
        })
    };
    reader.readAsBinaryString(input.files[0]);
    };

}
// rowObj.snapshotChanges().subscribe(actions=>{
//   actions.forEach(action=>{
//     let y = action.payload.toJSON()
//     y["name"] = action.name
//     this.userKey
// //   console.log(action.payload.toJSON())
// //   console.log(action.payload.child('uid').val() )

    
      
//              })})


