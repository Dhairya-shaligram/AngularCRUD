export interface CommonPaginationModel 
{
    PageNumber: number;
    PageSize: number;
    SortColumn: string | null;
    SortOrder: string | null;
    StrSearch: string | null;
    RoleId: number | null;
    Path: string | null;
}
  
export interface ChangePasswordRequestModel 
{
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string 
}

export interface ApiResponse<T> {
success: boolean;
data: T;
}

export interface DepartmentResponseModel {
    departmentId: string;
    departmentName: string;
    TotalRecord: number;
}

export interface DepartmentRequestModel {
    DepartmentId: string;
    DepartmentName: string;
}
  
export interface LoginResponseModel
{
    UserId : number;
    FullName : string;
    EmailId : string;
    Photo : string;
    RoleId : number;
    JWTToken : string;
    Status : number | null;
}

export interface LoginRequestModel
{
    email : string;
    password : string;
}

export interface ForgotPasswordRequestModel
{
    email : string;
}

export interface EmployeeRequestModel
{
    EmployeeId: string;  
    EmployeeName : string;
    EmailId : string;
    Department : string;
    DepartmentId : string;
    DOJ : Date;
    PhotoFileName : string;
}

export interface EmployeeResponseModel
{
    employeeId : string;
    employeeName : string;
    emailId : string;
    department : string;
    departmentId : string;
    doj : Date;
    photoFileName : string;
    totalRecords: number;
}

export interface BaseApiResponse {
    success: boolean;
    message: string;
}

export interface ApiPostResponse<T> extends BaseApiResponse {
    data: T;  
}

export interface Response extends BaseApiResponse {
    taid: number;  
}

