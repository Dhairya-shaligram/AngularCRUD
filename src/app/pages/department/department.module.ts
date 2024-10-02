import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../common/data-table/data-table.module';
import { ShowDepartmentComponent } from './show-department/show-department.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';

@NgModule({
  declarations: [
    ShowDepartmentComponent,
    DepartmentMasterComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
  ]
})
export class DepartmentModule { }
