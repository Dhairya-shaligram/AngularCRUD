import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/api-url-helper';
import { NotificationType } from 'src/app/core/enums/common-enum';
import { PaginationModel } from 'src/app/core/model/common-model';
import { CommonService } from 'src/app/core/services/commonservice.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrl: './user-master.component.css',
})
export class UserMasterComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({});
  userId: number = 0;
  roleList: any[] = [];
  filterParams: PaginationModel = {
    PageSize: 10,
    PageNumber: 1,
    SortColumn: '',
    SortOrder: '',
    StrSearch: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private apiUrl: ApiUrlHelper,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initUserForm();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = +this.commonService.Decrypt(id); // Convert id to a number
      }
    });

  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phoneNo: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      roleId: ['', [Validators.required]],
    });
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  getUserDetails(userId: number) {
    const apiUrl = this.apiUrl.apiUrl.user.getUserList;
    const obj = {
      id: userId ?? 0,
    };
    this.commonService
      .doPost(apiUrl, obj)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success && data.Data.length > 0) {
            const user = data.Data[0];
            // Set Form Details
            this.userForm.setValue({
              firstName: user.FirstName,
              lastName: user.LastName,
              email: user.Email,
              password: user.Password,
              phoneNo: user.PhoneNo || '', // Handle null case
              roleId: user.RoleId,
            });
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  onSubmit() {
    debugger;
    if (!this.userForm.valid) {
      return false;
    }

    const obj = {
      ...this.userForm.value,
      UserId: this.userId,
    };
    const apiUrl = this.apiUrl.apiUrl.user.saveUser;
    this.commonService
      .doPost(apiUrl, obj)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data.Success) {
            this.commonService.showNotification(
              'User',
              data.Message,
              NotificationType.SUCCESS,
            );
            this.router.navigate(['/user']);
          } else {
            this.commonService.showNotification(
              'User',
              data.Message,
              NotificationType.ERROR,
            );
          }
        },
        error: (er) => {
          console.error(er);
        },
        complete: () => {
          console.info('complete');
        },
      });
    return true;
  }

  onBack() {
    history.back();
  }
}
