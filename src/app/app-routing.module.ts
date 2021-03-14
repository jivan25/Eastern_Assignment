import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';


const routes: Routes = [
  { path: '', component: EmployeeListComponent},
  { path: 'employeeList', component: EmployeeListComponent},
  {path:'employeeRegister',component:EmployeeRegisterComponent},
  {path:'employeeRegister/:id',component:EmployeeRegisterComponent},
  {path:'**',component:EmployeeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
