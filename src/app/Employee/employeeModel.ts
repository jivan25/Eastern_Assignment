export interface EmployeeModel{
    id?:number,
    name:string,
    address:EmployeeAddress,
    phone:string


}
export interface EmployeeAddress{
    city?:string,
    address1:string,
    address2:string,
    postalCode:string
}
