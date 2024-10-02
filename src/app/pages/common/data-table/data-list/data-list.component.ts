import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable, catchError, map, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { PaginationModel, TableColumn, ApiResponse } from 'src/app/core/model/common-model';
import { ApiType, NotificationType, TableType } from 'src/app/core/enums/common-enum';
import { CommonService } from 'src/app/core/services/commonservice.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements AfterViewInit {
  isFirstTime = true;
  itemList: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];
  searchTerm = '';
  totalRecord = 0;
  pagination: PaginationModel = { PageNumber: 1, PageSize: 10, StrSearch: this.searchTerm, SortColumn: '', SortOrder: '' };
  sortColumn = '';
  sortOrder = '';
  searchTimeout: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() columns!: Array<TableColumn>;
  @Input() apiDetails!: any;
  @Input() tableType: string = TableType.Normal;

  @Output() onActionEvent = new EventEmitter<any>();

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.initList();
  }

  ngAfterViewInit(): void {
    if (this.dataSource.filteredData.length > 0) {
      this.setTablePagination();
    }
  }

  initList() {
    this.displayedColumns = this.columns.filter(col => col.isShow).map(col => col.columnDef);
    if (this.tableType === TableType.Pagination) {
      Object.assign(this.apiDetails.requestData, this.pagination);
    }

    this.fetchRecords()!.subscribe({
      next: (data: ApiResponse) => {
        if (data && data.Success) {
          this.itemList = data.Data;
          this.dataSource = new MatTableDataSource(this.itemList);
          this.totalRecord = this.itemList?.length || 0;
          this.setTablePagination();
        } else {
          this.commonService.showNotification('List', data.Message, NotificationType.ERROR);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  fetchRecords(): Observable<any> | null {
    const apiUrl = this.apiDetails.type === ApiType.Get
      ? this.commonService.getApiURL(this.apiDetails.url, this.apiDetails.requestData)
      : this.apiDetails.url;

    const apiCall = this.apiDetails.type === ApiType.Get
      ? this.commonService.doGet(apiUrl)
      : this.commonService.doPost(apiUrl, this.apiDetails.requestData);

    return apiCall.pipe(
      map((data: ApiResponse) => data),
      catchError((error) => throwError(() => new Error(error)))
    );
  }

  pageChanged(event: any) {
    if (this.tableType === TableType.Pagination) {
      this.pagination = { PageNumber: event.pageIndex + 1, PageSize: event.pageSize, StrSearch: this.searchTerm, SortColumn: this.sortColumn, SortOrder: this.sortOrder };
      this.initList();
    }
  }

  sortChange(event: any) {
    if (this.tableType === TableType.Pagination) {
      this.sortColumn = event.active;
      this.sortOrder = event.direction;
      this.pagination.SortColumn = this.sortColumn;
      this.pagination.SortOrder = this.sortOrder;
      this.initList();
    }
  }

  seacrchChange() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (this.tableType === TableType.Pagination) {
        if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
        this.pagination.StrSearch = this.searchTerm;
        this.initList();
      } else {
        this.dataSource.filter = this.searchTerm.trim().toLowerCase();
      }
    }, 500);
  }

  onAction(buttonDef: any, data: any) {
    if (buttonDef.IsConfirm) {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) this.onActionEvent.emit({ Type: buttonDef.Type, Data: data });
      });
    } else {
      this.onActionEvent.emit({ Type: buttonDef.Type, Data: data });
    }
  }

  setTablePagination() {
    if (this.isFirstTime) {
      this.isFirstTime = false;
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  getColumnDetails(type: string, columnDef: string): any {
    const column = this.columns.find(col => col.columnDef === columnDef);
    
    if (!column) {
      return null;
    }
  
    if (type === 'title') {
      return column.title;
    } else if (type === 'button') {
      return column.buttons || []; 
    }
  
    return null;
  }
}
