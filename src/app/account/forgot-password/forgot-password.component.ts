import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordRequestModel } from 'src/app/model/common-model';
import { CommonService } from 'src/app/service/commonservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  formSubmitted= false;

  constructor(private fb: FormBuilder, private commonService: CommonService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.forgotPasswordForm.valid) {
      const formValue = this.forgotPasswordForm.value;

      const forgotPasswordRequestModel: ForgotPasswordRequestModel = {
        email: formValue.email
      };

      this.commonService.forgotPassword(forgotPasswordRequestModel).subscribe(res => {
        if(res.success)
        {
          this.toastr.success(res.message.toString());
        }
        else
        {
          this.toastr.error(res.message.toString());
        }
      });
    }
  }
}
