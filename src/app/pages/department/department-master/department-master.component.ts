import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrlHelper } from 'src/app/config/api-url-helper';

import { NotificationType } from 'src/app/core/enums/common-enum';
import { PaginationModel } from 'src/app/core/model/common-model';
import { CommonService } from 'src/app/core/services/commonservice.service';


@Component({
  selector: 'app-department-master',
  templateUrl: './department-master.component.html',
  styleUrls: ['./department-master.component.css'],
})
export class DepartmentMasterComponent implements OnInit {
  departmentForm: FormGroup = this.formBuilder.group({});
  departmentId: string = '';
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
    this.initDepartmentForm();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.departmentId = this.commonService.Decrypt(id); // Convert id to a number
      }
    });

  }

  initDepartmentForm() {
    this.departmentForm = this.formBuilder.group({
      departmentName: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  get departmentFormControl() {
    return this.departmentForm.controls;
  }

  onSubmit() {
    if (!this.departmentForm.valid) {
      return false;
    }

    const obj = {
      ...this.departmentForm.value,
      departmentId: this.departmentId,
    };
    const apiUrl = this.apiUrl.apiUrl.department.saveDepartment;
    this.commonService
      .doPost(apiUrl, obj)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data.Success) {
            this.commonService.showNotification(
              'Department',
              data.Message,
              NotificationType.SUCCESS,
            );
            this.router.navigate(['/department']);
          } else {
            this.commonService.showNotification(
              'Department',
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
