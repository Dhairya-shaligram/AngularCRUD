// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-change-password',
//   templateUrl: './change-password.component.html',
//   styleUrls: ['./change-password.component.css']
// })
// export class ChangePasswordComponent implements OnInit {

//   changePasswordForm!: FormGroup;
//   formSubmitted: boolean = false;
//   showCurrentPassword = false;
//   showNewPassword = false;
//   showConfirmPassword = false;

//   constructor(
//     private fb: FormBuilder,
//     private commonService: CommonService,
//     private toastr: ToastrService
//   ) { }

//   ngOnInit(): void {
//     this.changePasswordForm = this.fb.group({
//       currentPassword: ['', Validators.required],
//       newPassword: ['', Validators.required],
//       confirmPassword: ['', [Validators.required]]
//     })
//   }

//   toggleCurrentPasswordVisibility() {
//     this.showCurrentPassword = !this.showCurrentPassword;
//   }

//   toggleNewPasswordVisibility() {
//     this.showNewPassword = !this.showNewPassword;
//   }

//   // Toggle visibility for confirm password
//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }
  
//   changePassword(): void {
//     this.formSubmitted = true;
//     if (this.changePasswordForm.valid) {
//       const formValue = this.changePasswordForm.value;

//       const changePasswordRequestModel: ChangePasswordRequestModel = {
//         OldPassword: formValue.currentPassword,
//         NewPassword: formValue.newPassword,
//         ConfirmPassword: formValue.confirmPassword
//       };
      
//       const formData = new FormData();
//       formData.append('OldPassword', changePasswordRequestModel.OldPassword);
//       formData.append('NewPassword', changePasswordRequestModel.NewPassword);
//       formData.append('ConfirmPassword', changePasswordRequestModel.ConfirmPassword);
      
//       this.commonService.changePassword(formData).subscribe(res => {
//         if(res.success)
//         {
//           this.toastr.success(res.message.toString());
//         }
//         else
//         {
//           this.toastr.error(res.message.toString());
//         }
//       });
//     }
//   }
// }
