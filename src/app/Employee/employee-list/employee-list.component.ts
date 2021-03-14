
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ErrorObserver } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { EmployeeModel } from '../employeeModel';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id','name','phone','city','address1','address2','postal','update'];
  dataSource:any=new MatTableDataSource<EmployeeModel>();
  arrayOfEmployeeDetails:EmployeeModel[]=[];
  
  constructor(
    private snackBar:MatSnackBar,
    private router:Router,
    private employeeService:EmployeeService
    ) { }

  ngOnInit(): void {
   this.getEmployeeDetails()
  }


 getEmployeeDetails(){
  this.employeeService.getEmployeeDetails().subscribe((data:EmployeeModel[])=>{
    this.dataSource= data
     this.arrayOfEmployeeDetails=data;
    },
    (error:ErrorObserver<any>)=>{
      this.openSnackBar(error.toString(),'')
    })
 }
searchValue(inputVal:string){
  this.dataSource=this.arrayOfEmployeeDetails.filter((item=>{
      return (item.name.toLowerCase().includes(inputVal.toLowerCase()) || item.address.city.toLowerCase().includes(inputVal.toLowerCase()))
  }))
}

 isNumber(val): boolean { 
   return !isNaN(val); 
  }

 editEmployee(employeeId){
  this.router.navigateByUrl('/employeeRegister/'+employeeId)
}

 addEmployee(){
      this.router.navigateByUrl('/employeeRegister')
 }
    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
