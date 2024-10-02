import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DataListComponent } from './data-list/data-list.component';

@NgModule({
  declarations: [DataListComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
  ],
  exports: [DataListComponent],
})
export class DataTableModule {}
