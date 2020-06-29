import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
like=99
unlike:Boolean=true
  constructor() { }

  ngOnInit() {
  }

//   s(){

// if(localStorage.getItem('like') == null){
//  localStorage.setItem('like','true')
//   this.like=this.like+1;
//   this.unlike =!this.unlike
  
// }else{
//   localStorage.removeItem('like')
//   this.like=this.like-1
//   this.unlike =!this.unlike

// }
  
// }

}
