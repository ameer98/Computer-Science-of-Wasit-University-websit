import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import * as firebase from 'firebase';
import { UsersService, Users } from 'src/app/services/user/users.service';
import { AngularFireDatabase, AngularFireList ,AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  admin = [];
  teacher = [];
  graduate = [];
  StudentStage1 = [];
  StudentStage2 = [];
  StudentStage3 = [];
  StudentStage4 = [];
  itemList: AngularFireList<any>

  formadduser: FormGroup;
  formaddpdf: FormGroup;
  loadingData :Boolean = true  ;
num = [];
  stg:Boolean =true;
  itemArray = []  
  constructor(private _formBuilder: FormBuilder ,public db :AngularFireDatabase , private UsersService:UsersService) {
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
 this.loadingData = false;
    })
    // this.uploadProgress =50;

  }
   
  ngOnInit() {

    this.formadduser = this._formBuilder.group({
      fullName: ['',Validators.required] ,
      // password :['',Validators.required] ,
      email: ['',Validators.required], 
      rule: ['',Validators.required], 
      stage: ['',Validators.required] ,
    })
    this.formaddpdf = this._formBuilder.group({
      title: ['',Validators.required] ,
      body : ['',Validators.required] ,
      stage: ['',Validators.required] 
    })
  }
  onChange($event) {
    let rules =(<HTMLInputElement>event.target).value
    if(rules === 'student' ){
      this.stg = false;
      this.formadduser.addControl('stage',new FormControl ('',Validators.required))
    }else{
      this.stg = true
      this.formadduser.removeControl('stage')
    }
    // console.log(rules);
  }

  adduser(){
    const fullName =  this.formadduser.controls['fullName'].value  ;
    const email = this.formadduser.controls['email'].value ;
    const password = '123456789';
    const rule = this.formadduser.controls['rule'].value ;
    if(this.stg === true){
      //Add admin or tacher
      this.UsersService.addAdmin(fullName,email,password,rule)

    }else{
      const stage = this.formadduser.controls['stage'].value ;
      //Add Student
      this.UsersService.addStudent(fullName,email,password,rule,stage)

    }
  }

  addpdf(){
    const title =  this.formaddpdf.controls['title'].value  ;
    const body =  this.formaddpdf.controls['body'].value  ;
    const stage =  this.formaddpdf.controls['stage'].value  ;

    this.UsersService.addpdf(title ,body ,stage);
  }
 
  dat(){
    console.log('data' + new Date())
  }

  }

 
