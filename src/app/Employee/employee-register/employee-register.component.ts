import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorObserver } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  formGroup: FormGroup;
  arrayOfEmployeeDetails: any[] = [];
  id: string;
  label:string='Add';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {

    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id != null) {
      this.label='Update'
     this.getEmployeeDetailsById(this.id)
    }
  }

  getEmployeeDetailsById(id) {
    this.employeeService.getEmployeeDetailsById(id).subscribe((data: any) => {
      console.log(this.formGroup)
      this.formGroup.get('name').setValue(data.name)
      this.formGroup.get('phone').setValue(data.phone)
      this.formGroup.get(['address','city']).setValue(data.address.city)
      this.formGroup.get(['address','address_line1']).setValue(data.address.address_line1)
      this.formGroup.get(['address','address_line2']).setValue(data.address.address_line2)
      this.formGroup.get(['address','postal_code']).setValue(data.address.postal_code)
    }, 
    (error:ErrorObserver<any>)=>{
      this.openSnackBar(error.toString(),'')
    })
  }

  createForm() {
   
    let mobileRegex: RegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/
    this.formGroup = this.formBuilder.group({
      phone: [null, [Validators.required, Validators.pattern(mobileRegex)]],
      name: [null, Validators.required],
      address:  this.formBuilder.group({
        city:[null, Validators.required],
        address_line1: [null, Validators.required],
        address_line2: [null, Validators.required],
        postal_code:[null, Validators.required],
      }),
    });
  }

  onCancel() {
    this.router.navigateByUrl('/employeeList')
  }

  onSubmit(formData) {

    console.log(formData)
    if (this.id != null) {
      this.employeeService.updateEmployeeDetails(formData,parseInt(this.id)).subscribe((data)=>{
        this.openSnackBar('Employee has updated successfully','')
        this.router.navigateByUrl('/employeeList')
      })

    } else {
      this.employeeService.addEmployeeDetails(formData).subscribe((data)=>{
        this.openSnackBar('Employee has registered successfully','')
        this.router.navigateByUrl('/employeeList')
      })

    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
