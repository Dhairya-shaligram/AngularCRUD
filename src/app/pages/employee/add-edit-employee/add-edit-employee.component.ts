import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/services/commonservice.service';
import { ApiUrlHelper } from 'src/app/config/api-url-helper';
import { NotificationType } from 'src/app/core/enums/common-enum';
import { DepartmentResponseModel } from 'src/app/core/model/common-model1';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  departmentList: DepartmentResponseModel[] = [];
  photoFileName: string = '';
  photoFilePath: string = '';
  formSubmitted: boolean = false;

  @Input() emp: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private apiUrl: ApiUrlHelper,
  ) { }

  ngOnInit(): void {
    debugger
    this.initForm();
    const apiUrl = this.apiUrl.apiUrl.employee.getDepartmentList;

    this.commonService.doGet(apiUrl).pipe().subscribe({
      next: (data) => {
      // this.departmentList = data;
      if(data)
      {
          this.departmentList = data.Data;
      }
      }
    });


    if (this.emp) {
      const departmentName = this.getDepartmentName(this.employeeForm.value.department);
      debugger
      this.employeeForm.patchValue({
        employeeId: this.emp.EmployeeId,
        employeeName: this.emp.EmployeeName,
        emailId: this.emp.EmailId,
        department: departmentName,
        departmentId: this.emp.DepartmentId,
        doj: this.emp.DOJ ? this.emp.DOJ.split('T')[0] : '',
        photo: this.emp.Photo
      });
    }
  }

  initForm()
  {
    this.employeeForm = this.fb.group({
      employeeId: [null],
      employeeName: ['', Validators.required],
      departmentId: ['', Validators.required],
      doj: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      photo: [null]
    });
  }

  getDepartmentName(departmentId: string): string {
    const department = this.departmentList.find(dep => dep.departmentId === departmentId);
    return department ? department.departmentName : '';
  }

  saveEmployee()  {
    if (!this.employeeForm.valid) {
      return false;
    }
    const apiUrl = this.apiUrl.apiUrl.employee.saveEmployee;
    const departmentName = this.getDepartmentName(this.employeeForm.value.departmentId);

    const obj = {
      employeeId: this.emp.EmployeeId,
      employeeName: this.emp.EmployeeName,
      emailId: this.emp.EmailId,
      department: departmentName,
      departmentId: this.emp.DepartmentId,
      doj: new Date(this.emp.DOJ).toISOString(),
      photo: this.emp.Photo
    };
    this.commonService
      .doPost(apiUrl, obj)
      .pipe()
      .subscribe({
        next: (data) => {
          if (data && data.Success) {
            this.commonService.showNotification(
              '',
              data.Message,
              NotificationType.SUCCESS,
            );
          } 
          else {
            this.commonService.showNotification(
              '',
              data.Message,
              NotificationType.ERROR,
            );
          }
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

  // uploadPhoto(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData: FormData = new FormData();
  //     formData.append('file', file, file.name);

  //     this.service.uploadPhoto(formData).subscribe((data: any) => {
  //       this.photoFileName = data.toString();
  //       this.photoFilePath = this.service.photoUrl + this.photoFileName;
  //     });
  //   }
  // }
}
