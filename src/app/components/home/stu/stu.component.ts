import { Component, OnInit,HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService, poster, pdfS } from 'src/app/services/upload/upload.service';
import { UsersService } from 'src/app/services/user/users.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireStorage } from '@angular/fire/storage';
import UIkit from 'uikit'
import { Observable } from 'rxjs';
import { Users } from 'src/app/services/user/users';
import * as firebase from 'firebase';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-stu',
  templateUrl: './stu.component.html',
  styleUrls: ['./stu.component.css']
})
export class StuComponent implements OnInit {
  //upload file one
  ref : AngularFireStorageReference;
  task:AngularFireUploadTask;
  downloadURL :String;
  fileName : String ;
  uploadProgress;
  load:Boolean= false ;
  uploads:Boolean= false ; 
  progs

  downloadURL2 :String;
  fileName2 : String ;
  uploadProgress2;
  load2:Boolean= false ;
  uploadss2:Boolean= false ;
  progs2
  pdfC1 =[];
  pdfC2 =[];
  submitted: Boolean =false;
  formaddPdf: FormGroup;
  formaddPost: FormGroup;
  itemList: AngularFireList<any>
  profileData: AngularFireList<any>
  profile =[];
  sli:Boolean = false;
  public innerWidth: any;
  loading:Boolean =true ;
  emailVerified : Boolean =false;
  num2
  post =[]
  status: boolean = false;
  stage
   


  data = {
    displayName: '',
    email:'',
    img: '',
    lastLogin: '',
    role:  '',
    stage: ''
   } 
 
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth <= 768){
           this.sli = false
    }
    else
        this.sli = true
  }
  isHovered: HTMLElement;
  constructor(public db :AngularFireDatabase,private fsor:AngularFireStorage,private AuthService:AuthService,private UploadService:UploadService,private _formBuilder: FormBuilder ,private UsersService:UsersService) {

    firebase.auth().onAuthStateChanged(
      user => {
        this.stage =user.displayName
        this.db.list(`item/${this.stage}/post`).snapshotChanges().subscribe(actions=>{
          actions.forEach(action=>{
            this.num2 ++
      
            let y = action.payload.toJSON()
            y["$key"] = action.key
            this.post.push(y as poster)
            this.post.reverse()
      
            })
            // this.loading =  false
      console.log( this.num2)
            })
            this.db.list(`item/${this.stage}/pdf`).snapshotChanges().subscribe(actions=>{
              actions.forEach(action=>{          
                let y = action.payload.toJSON()
                y["$key"] = action.key
                if(action.payload.child('course').val() == "course1"){
                  this.pdfC1.push(y as pdfS)
                }else{
                  this.pdfC2.push(y as pdfS)

                }
              
          
                })
                // this.loading =  false
          console.log( this.num2)
                })
        this.emailVerified = user.emailVerified ;
        console.log(user.displayName+"stggg")
        this.db.list('users').snapshotChanges().subscribe(actions=>{
          actions.forEach(action=>{
            let y = action.payload.toJSON()
            y["$key"] = action.key
            if(action.key  == user.uid){
              this.profile.push(y as Users)
              this.stage = this.profile[0]['stage'] 
localStorage.setItem('stage', this.stage)
              console.log('jj'+  this.profile[0]["$key"] )
              this.data.displayName = this.profile[0]['displayName'] ;
              this.data.email = this.profile[0]['email'] ;
              this.data.img = this.profile[0]['img'] ;
              this.data.lastLogin = this.profile[0]['lastLogin'] ;
              this.data.role = this.profile[0]['role'] ;
              this.data.stage = this.profile[0]['stage'] ;
 

                        }
            })
            this.loading =  false

            })
      }
    )
console.log(this.stage+"this.data.stage")



  }

    ngOnInit() {
      this.innerWidth = window.innerWidth;
        window.innerWidth <= 760 ? this.sli = false : this.sli = true;

        this.formaddPost = this._formBuilder.group({
          title: ['',Validators.required] ,
          body : ['',Validators.required] ,
        })

        this.formaddPdf = this._formBuilder.group({
          title: ['',Validators.required] ,
          course : ['',Validators.required] ,
          link : ['',Validators.required] ,

        })



      


        
    }
    slid(){
      this.sli = !this.sli
      console.log("SDF"+  this.sli)
    }





    addPost(){
    this.submitted = true;
    const nameTech = this.data.displayName; 
    const stage = this.data.stage; 
    const img = this.data.img; 
    const title =  this.formaddPost.controls['title'].value  ;
    const body =  this.formaddPost.controls['body'].value  ;
      this.UploadService.addPost(nameTech,stage,img,title,body)
      this.post = []
      this.submitted = true
    }

    addPdf(){
      this.submitted = true;
      const nameTech = this.data.displayName; 
      const stage = this.data.stage; 
      const title =  this.formaddPdf.controls['title'].value  ;
      const course =  this.formaddPdf.controls['course'].value  ;
      const urlpdf = this.downloadURL;
      const urlpdf2 = this.downloadURL2;
      const linkprogram = this.formaddPdf.controls['link'].value  ;
      this.UploadService.addPdf(nameTech,stage,title,course,urlpdf,urlpdf2,linkprogram)
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
            this.uploadss2  = true ;  
            console.log('progress'+prog)
          }
        })
        console.log(event.target.files[0])
        this.task.snapshotChanges().pipe(
          finalize(() => {
           this.ref.getDownloadURL().subscribe(url => {
             this.downloadURL2 = url
            console.log('url '+url); 
    
             
           });
          //  console.log(url); 
    
         }))
         .subscribe();  
       
    
      }

      uploads2(event){
        this.load2 = true
        let file = event.target.files[0];
        this.fileName2= file.name;
        console.log('name file' + this.fileName)
        const id = Math.random().toString(36).substring(2);
        this.ref = this.fsor.ref(id);
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress2 = this.task.percentageChanges().subscribe(prog => {
          this.progs2 = Math.floor(prog)
          if(prog === 100){
            this.uploads  = true ;  
            console.log('progress'+prog)
          }
        })
        console.log(event.target.files[0])
        this.task.snapshotChanges().pipe(
          finalize(() => {
           this.ref.getDownloadURL().subscribe(url => {
             this.downloadURL = url
            console.log('url '+url); 
    
             
           });
          //  console.log(url); 
    
         }))
         .subscribe();  
       
    
      }
    deletePost( $key){
      this.status = !this.status;       
      console.log($key)
      this.db.list(`item/${this.stage}/post`).remove($key)
      this.post = []
    }
    deletePdf($key){
      this.db.list(`item/${this.stage}/pdf`).remove($key)
      this.pdfC1 = []
    }
    
    logout(){
      this.AuthService.logout()
    }
}
