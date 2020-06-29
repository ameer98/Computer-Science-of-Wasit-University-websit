import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import 'firebase/database';
import { AngularFireDatabase, AngularFireList ,AngularFireObject } from '@angular/fire/database';
import UIkit from 'uikit'
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  path:String;
  stg:Boolean =true;
  userKey:any
   num =[] ;

  itemList: AngularFireList<any>
  itemArray :  Array<any>;
  itemArray2 : Array<any>;

  members = [];
  student = [];
  StudentStage1 = [];
  StudentStage2 = [];
  StudentStage3 = [];
  StudentStage4 = [];
  admin = [];
  teacher = [];
  graduate = [];






  loadingData :Boolean = true;

  GetStudentsList() {
    this.studentsRef = this.db.list('item');
    return this.studentsRef;
  }  
  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  unData = [];
  constructor(private fbAuth:AngularFireAuth, public db :AngularFireDatabase ,) { 
    
   

this. getStudentStage2()
   
    
}
addAdmin(fullName,email,password,role){
        this.fbAuth.createUserWithEmailAndPassword(email,password).then(
          user =>{
            user.user.updateProfile({
              photoURL : role
             }).then(
               () =>{
                this.db.object(`users/${user.user.uid}`).set({
                  displayName : fullName ,
                   email: email ,
                   role: role,
                   lastLogin: null
                 });
               }
             ) 


            UIkit.notification({message: 'Success add User', pos: 'top-center', status: 'success'})

          }
        ).catch(error=>{
          

          UIkit.notification({message: error, pos: 'top-center', status: 'danger' , timeout: 100000})

          console.error(error)
        })
        console.log(fullName,email,role,password)

    
  }
  addStudent(fullName,email,password,role,stage){
         this.fbAuth.createUserWithEmailAndPassword(email,password).then(
           user =>{
             user.user.updateProfile({
              displayName: stage,
              photoURL : role
            
             }).then(
               () =>{
                this.db.object(`users/${user.user.uid}`).set({

                // this.db.list(`users/`).push({
                  displayName : fullName ,
                   email: email ,
                   role: role,
                   img : 'https://firebasestorage.googleapis.com/v0/b/scomp-4aab2.appspot.com/o/32b095jbdym?alt=media&token=e4130c0d-cbf4-4b18-8c38-6bee21fc28b1',
                   stage : stage,
                   lastLogin: new Date().valueOf()
                 });
               }
             )  
             UIkit.notification({message: 'Success add User', pos: 'top-center', status: 'success'});
           }   
         ).catch(error=>{
                        UIkit.notification({message: error, pos: 'top-center', status: 'danger' , timeout: 100000});
                        console.error(error)
        })



  }




  getUsers(){
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
             } else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage1')) {
              this.StudentStage1.push(y as Users)
             }else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage2')) {
               this.StudentStage2.push(y as Users)
              }else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage3')) {
               this.StudentStage3.push(y as Users)
              }else if ((action.payload.child('role').val()  == 'student')&&(action.payload.child('stage').val()  == 'stage4')) {
               this.StudentStage4.push(y as Users)
              }
  })

 console.log( this.student+"ssssss")
     })

  }
  
  getStudentStage2(){
//  
this.itemArray = []
this.itemArray2 = []
    let num2 = 0 ;
    
    this.itemList = this.db.list('users')
    this.itemList.snapshotChanges()
    .subscribe(actions=>{
          actions.forEach(action=>{
            let y = action.payload.toJSON()
            y["$key"] = action.key
            console.log(action.payload.child('uid').val())
            if(action.payload.child('uid').val()  == firebase.auth().currentUser.uid){
              this.members.push(y as Users)
            }
           
}
)


this.loadingData =  false

    })
this.itemArray.forEach(data =>{
  this.itemArray.map(st =>{
    console.log(st.stage)

  
})
})
   
  }



  getInfoUser(){

    this.itemArray = []
    this.itemArray2 = []
        
        this.itemList = this.db.list('users')
        this.itemList.snapshotChanges()
        .subscribe(actions=>{
              actions.forEach(action=>{
                let y = action.payload.toJSON()
                y["$key"] = action.key
                console.log(action.payload.child('uid').val())
                if(action.payload.child('uid').val()  == firebase.auth().currentUser.uid){
                  this.members.push(y as Users)
                }
              
    }
    )
    
    
    console.log(this.members[0]['email'] )
    
    this.loadingData =  false
    
        })
  }
  adduser(fullName,email,password,rule,stage){
    console.log(fullName,email,password,rule,stage)

   }
  addpdf(title ,body ,stage){

  console.log('addPdf' +' title:'+ title +' body:'+body +' stage:'+ stage)
  this.db.list('item/4/pdf').push({
         title : "asas",

  })
    
    this.db.object('item/4/pdf').snapshotChanges()
  }

  
}
export class Item {

  $key: string;
  title: string;
  time: Date = new Date();
  active: boolean = true;
}

export class Users {
   uid: string;
  displayName: string;

email: string;

img: string;

lastLogin: string;

role:  string;

  
}


  







