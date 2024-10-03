import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDepartmentComponent } from './show-department/show-department.component';
import { DepartmentMasterComponent } from './department-master/department-master.component';

const routes: Routes = [
  {
    path: '',
    component: ShowDepartmentComponent,
  },
  {
    path: 'add',
    component: DepartmentMasterComponent,
  },
  {
    path: 'edit/:id',
    component: DepartmentMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
