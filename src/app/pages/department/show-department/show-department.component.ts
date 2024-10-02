import { Component, ViewChild } from '@angular/core';
import { DepartmentResponseModel } from 'src/app/core/model/common-model1';
import { CommonService } from 'src/app/core/services/commonservice.service';

import { ActionType, ApiType, NotificationType, TableType } from 'src/app/core/enums/common-enum';
import { ActionEvent, ApiConfigModel, TableColumn } from 'src/app/core/model/common-model';
import { ApiUrlHelper } from 'src/app/config/api-url-helper';
import { Router } from '@angular/router';
import { DataListComponent } from '../../common/data-table/data-list/data-list.component';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})
export class ShowDepartmentComponent {
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
      columnDef: 'DepartmentName',
      title: 'Department Name',
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
    url: this.apiUrl.apiUrl.department.getDepartments,
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


  onAddEdit(data: DepartmentResponseModel | null) {
    debugger
    const id = data ? this.commonService.Encrypt(data?.departmentId.toString()) : '';
    if (data) {
      this.router.navigate(['department/edit', id]);
    } 
    else {
      this.router.navigate(['department/add']);
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


onDelete(data: DepartmentResponseModel) {
  const apiUrl = this.apiUrl.apiUrl.department.deleteDepartment;
  this.commonService
    .doDelete(apiUrl, data.departmentId)
    .pipe()
    .subscribe({
      next: (data) => {
        if (data && data.Success) {
          this.commonService.showNotification(
            'Department',
            data.Message,
            NotificationType.SUCCESS,
          );
          this.dataList.initList();
        } else {
          this.commonService.showNotification(
            'Department',
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