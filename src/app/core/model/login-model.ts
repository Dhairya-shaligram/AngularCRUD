export interface LoginModel {
  Email: string;
  Password: string;
}

export interface LoginResponseModel
 {
  UserId: number;
  FullName: string;
  EmailId: string;
  Photo: string;
  RoleId: number | null;
  JWTToken: string;
  Status: number| null;
}