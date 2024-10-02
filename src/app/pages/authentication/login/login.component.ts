import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/api-url-helper';
import { NotificationType } from 'src/app/core/enums/common-enum';
import { LoginResponseModel } from 'src/app/core/model/common-model1';
import { CommonService } from 'src/app/core/services/commonservice.service';
import {
  StorageKey,
  StorageService,
} from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private commonService: CommonService, 
    private apiUrl: ApiUrlHelper,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.storageService.clearStorage();
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  doLogin() {
    if (!this.loginForm.valid) {
      return false;
    }
    const apiUrl = this.apiUrl.apiUrl.account.loginUser;
    const objData = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };

    this.commonService
      .doPost(apiUrl, objData)
      .pipe()
      .subscribe({
        next: (data) => {
          debugger
          if (data.Success && data.Data) {
            const LoginDetail: LoginResponseModel = data.Data;
            if (LoginDetail) 
            {
              this.commonService.showNotification(
                'Login',
                data.Message,
                NotificationType.SUCCESS,
              );
              debugger
              this.router.navigate(['department']);
            } 
            else {
              const loginData = 
              {
                JWTToken: data.Data.JWTToken,
                FullName: data.Data.FullName,
                LastName: data.Data.LastName,
                UserPhoto: data.Data.UserPhoto,
                EmailId: data.Data.EmailId
              };
              this.storageService.setValue(StorageKey.loginData, loginData);
              this.commonService.showNotification(
                'Login',
                data.Message,
                NotificationType.SUCCESS,
              );
              this.router.navigate(['department']);
            }
          } else {
            this.commonService.showNotification(
              'Login',
              data.Message,
              NotificationType.ERROR,
            );
          }
          return;
        },
        error: (er) => {
          console.error(er);
          return;
        },
        complete: () => {
          console.info('complete');
          return;
        },
      });
    return true;
  }
}
