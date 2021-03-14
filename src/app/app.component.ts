import { MediaMatcher } from '@angular/cdk/layout';
import { Route } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EmployeeManagement';
   constructor(private router:Router){
   }  

   ngOnInit(){

   }
   

}
