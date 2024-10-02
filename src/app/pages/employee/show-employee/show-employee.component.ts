// import { DatePipe } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { CommonPaginationModel, EmployeeResponseModel } from 'src/app/core/model/common-model1';
// import { CommonService } from 'src/app/core/services/commonservice.service';

// import * as XLSX from 'xlsx';

// @Component({
//   selector: 'app-show-employee',
//   templateUrl: './show-employee.component.html',
//   styleUrls: ['./show-employee.component.css']
// })
// export class ShowEmployeeComponent implements OnInit {
//   doj: Date = new Date();  // Example date
//   formattedDOJ: string = '';
//   constructor(private commonService: CommonService, private datePipe: DatePipe) { }

//   paginationModel!: CommonPaginationModel;
//   EmployeeList: EmployeeResponseModel[] = [];
//   ModalTitle = "";
//   ActivateAddEditEmpComp: boolean = false;
//   emp: any;

//   ngOnInit(): void {
//     this.formattedDOJ = this.datePipe.transform(this.doj, 'dd-MMM-yyyy') || '';
//     this.paginationModel = {
//       PageNumber: 1,
//       PageSize: 10,
//       SortColumn: 'EmployeeName',
//       SortOrder: 'asc',
//       StrSearch: '',
//       RoleId: 0,
//       Path: ''   
//     };

//     this.refreshEmpList();
//   }

//   exportToExcel(): void {
//     const headerElements = document.querySelectorAll('table th');
//     const headerNames: string[] = [];
    
//     // Collect header names from the table
//     headerElements.forEach(th => {
//       headerNames.push((th as HTMLElement).innerText.trim()); // Cast to HTMLElement for safety
//     });

//     const exportData = this.EmployeeList.map(item => {
//       return {
//         [headerNames[0]]: item.employeeName, // Employee Name
//         [headerNames[1]]: item.department,    // Department
//         [headerNames[2]]: this.formatDate(item.doj)             // Date Of Joining
//       };
//     });
  
//     // Convert the data to a worksheet
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook: XLSX.WorkBook = { Sheets: { 'Employee Data': worksheet }, SheetNames: ['Employee Data'] };
  
//     // Write workbook to buffer and trigger download
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, 'Employees');
//   }

//   formatDate(date: string | Date): string {
//     const d = new Date(date);
//     return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
//   }

//   private saveAsExcelFile(buffer: any, fileName: string): void {
//     const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;';
//     const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
//     const link = document.createElement('a');
//     const fileURL = URL.createObjectURL(data);
//     link.href = fileURL;
//     link.download = `${fileName}.xlsx`;
//     link.click();
//     URL.revokeObjectURL(fileURL); // Cleanup the URL object
//   }
  
//   addClick() {
//     this.emp = {
//       EmployeeId: null,
//       EmployeeName: "",
//       Department: "",
//       DepartmentId: "",
//       DateOfJoining: "",
//       PhotoFileName: "anonymous.png",
//       EmailId: ""
//     }
//     this.ModalTitle = "Add Employee";
//     this.ActivateAddEditEmpComp = true;
//   }

//   editClick(item: any) {
//     debugger
//     this.ModalTitle = "Edit Employee";
//     this.emp = {
//       EmployeeId: item.employeeId,
//       EmployeeName: item.employeeName,
//       EmailId: item.emailId,
//       DOJ: item.doj,
//       Department: item.department,
//       DepartmentId: item.departmentId,
//       PhotoFileName: item.photoFileName
//     };
//     this.ActivateAddEditEmpComp = true;
//   }

//   deleteClick(item: any) {
//     Swal.fire({
//       title: 'Are you sure you want to delete this record?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.commonService.deleteEmployee(item.employeeId).subscribe(data => {
//           Swal.fire({
//             title: 'Deleted!',
//             text: 'The employee has been deleted.',
//             icon: 'success',
//             timer: 2000,  
//             showConfirmButton: false
//           });
//           this.refreshEmpList();
//         });
//       }
//     });
//   }

//   closeClick() {
//     this.ActivateAddEditEmpComp = false;
//     this.refreshEmpList();
//   }

//   onCloseModal() {
//     this.closeClick();
//     this.refreshEmpList();  
//   }

//   refreshEmpList() {
//     this.service.getEmployees(this.paginationModel).subscribe(response => {
//       if (response.success) {
//         this.EmployeeList = response.data;
//       }
//     });
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentResponseModel, EmployeeResponseModel } from 'src/app/core/model/common-model1';
import { CommonService } from 'src/app/core/services/commonservice.service';

import { ActionType, ApiType, NotificationType, TableType } from 'src/app/core/enums/common-enum';
import { ActionEvent, ApiConfigModel, ButtonsConfig, TableColumn } from 'src/app/core/model/common-model';
import { ApiUrlHelper } from 'src/app/config/api-url-helper';
import { Router } from '@angular/router';
import { DataListComponent } from '../../common/data-table/data-list/data-list.component';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {
  @ViewChild('dataList') dataList: any = DataListComponent;
  // depart: any;
  // showModal: boolean = false; 
  // paginationModel!: CommonPaginationModel;
  // DepartmentList: DepartmentResponseModel[] = [];
  // ModalTitle = "";
  // ActivateAddEditDepartComp: boolean = false;
  // departRequestModel!: DepartmentRequestModel;
  // DepartmentIdFilter = "";
  // DepartmentNameFilter = "";
  // DepartmentListWithoutFilter: any = [];
  // totalRecords = 0;
  // pageSize = 5; 
  // currentPage = 1; 
  // StrSearch = '';
  // SortColumn = 'departmentName'; 
  // SortOrder = 'asc'; 
  colDefs: TableColumn[] = [
    {
      columnDef: 'EmployeeName',
      title: 'Employee Name',
      isShow: true,
      buttons: [],
    },
    {
      columnDef: 'Date Of Joining',
      title: 'Date Of Joining',
      isShow: true,
      buttons: [],
    },
    {
      columnDef: 'Department',
      title: 'Department',
      isShow: true,
      buttons: [],
    },
    {
      columnDef: 'Action',
      title: 'Action',
      isShow: true,
      buttons: [
        {
          Text: '',
          Icon: 'feather icon-edit',
          Type: ActionType.Edit,
          IsConfirm: false,
          Title: ActionType.Edit,
        },
        {
          Text: '',
          Icon: 'feather icon-trash-2',
          Type: ActionType.Delete,
          IsConfirm: true,
          Title: ActionType.Delete,
        },
      ],
    },
  ];
  apiDetails: ApiConfigModel = {
    url: this.apiUrl.apiUrl.employee.getEmployees,
    requestData: {},
    type: ApiType.Post,
  };
  tableType: TableType = TableType.Pagination;
  
  constructor(
    private apiUrl: ApiUrlHelper,
    private commonService: CommonService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {}

  // exportDepartments() {
  //   const exportData = this.DepartmentList.map(department => ({
  //     'Department Name': department.departmentName,
  //   }));
  
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Departments');
  
  //   XLSX.writeFile(wb, 'Departments.xlsx');
  // }


  onAddEdit(data: EmployeeResponseModel | null) {
    const id = data ? this.commonService.Encrypt(data?.departmentId.toString()) : '';
    if (data) {
      this.router.navigate(['employee/edit', id]);
    } else {
      this.router.navigate(['employee/add']);
    }
  }

  // addClick() {
  //   debugger
  //   this.depart = {
  //     DepartmentId: null,  
  //     DepartmentName: ""
  //   };
  //   this.ModalTitle = "Add Department";
  //   this.showModal = true; 
  // }
  
  // editClick(item: any) {
  //   debugger
  //   this.ModalTitle = "Edit Department";
  //   this.depart = {
  //     DepartmentId: item.departmentId,
  //     DepartmentName: item.departmentName
  //   };
  //   this.showModal = true; 
  // }
//  deleteClick(item: any) {
//     Swal.fire({
//       title: 'Are you sure you want to delete this record?',
//       text: 'You won\'t be able to revert this!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.service.deleteDepartment(item.departmentId).subscribe(res => {
//           if(res.success)
//             {
//               Swal.fire({
//                 title: 'Deleted!',
//                 text: 'The department has been deleted.',
//                 icon: 'success',
//                 timer: 2000,  
//                 showConfirmButton: false
//               });
//               this.refreshDepList();
//             }
//             else
//             {
//               this.toastr.error(res.message);
//             }
//         });
//       }
//     });
//   }

onAction(event: ActionEvent) {
  if (event) {
    if (event.Type == ActionType.Edit) {
    this.onAddEdit(event.Data);
    } else if (event.Type == ActionType.Delete) {
    this.onDelete(event.Data);
    }
  }
  }


onDelete(data: EmployeeResponseModel) {
  const apiUrl = this.apiUrl.apiUrl.employee.deleteEmployee;
  this.commonService
    .doDelete(apiUrl, data.employeeId)
    .pipe()
    .subscribe({
      next: (data) => {
        if (data && data.Success) {
          this.commonService.showNotification(
            'Employee',
            data.Message,
            NotificationType.SUCCESS,
          );
          this.dataList.initList();
        } else {
          this.commonService.showNotification(
            'Employee',
            data.Message,
            NotificationType.ERROR,
          );
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
}
  // closeClick() {
  //   this.showModal = false;
  // }

  // onCloseModal() {
  //   debugger
  //   this.closeClick();
  //   this.refreshDepList();  
  // }

  // refreshDepList() {
  //   debugger
  //   this.paginationModel = {
  //     PageNumber: this.currentPage,
  //     PageSize: this.pageSize,
  //     SortColumn: this.SortColumn,
  //     SortOrder: this.SortOrder,
  //     StrSearch: this.StrSearch,
  //     RoleId: 0,
  //     Path: ''  
  //   };

  //   this.service.getDepartments(this.paginationModel).subscribe(response => {
  //     if (response.success) {
  //       debugger
  //       this.totalRecords = response.data[0].TotalRecord;
  //       this.DepartmentList = response.data;
  //     }
  //   }
  //   );
  // }

  // onPageChange(event: PageEvent): void {
  //   debugger
  //   this.currentPage = event.pageIndex + 1;
  //   this.pageSize = event.pageSize;
  //   this.paginationModel 
  //   this.refreshDepList();
  // }
  
  // // Event handler for sort changes
  // onSortChange(sort: Sort): void {
  //   this.SortColumn = sort.active;
  //   this.SortOrder = sort.direction || 'asc'; 
  //   this.refreshDepList();
  // }

  // // Function for search
  // searchDepartments(): void {
  //   this.currentPage = 1; 
  //   this.paginationModel = {
  //     PageNumber: this.currentPage,
  //     PageSize: this.pageSize,
  //     SortColumn: this.SortColumn,
  //     SortOrder: this.SortOrder,
  //     StrSearch: this.StrSearch,
  //     RoleId: 0,
  //     Path: ''  
  //   };

  //   this.service.getDepartments(this.paginationModel).subscribe(response => {
  //     if (response.success) {
  //       debugger
  //       this.totalRecords = response.data[0].TotalRecord;
  //       this.DepartmentList = response.data;
  //     }
  //   }
  //   );
  // }
}