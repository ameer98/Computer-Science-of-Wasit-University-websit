import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// declare function printResult(): void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'computerweb';
  
    ngOnInit() {
      // printResult(); // Function call
    }
  
    
}
