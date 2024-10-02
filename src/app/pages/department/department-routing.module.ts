import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowDepartmentComponent } from './show-department/show-department.component';
import { authGuard } from 'src/app/auth-guard/auth.guard';
import { DepartmentMasterComponent } from './department-master/department-master.component';

const routes: Routes = [
  {
    path: '',
    component: ShowDepartmentComponent,
    canActivate: [authGuard], 
  },
  {
    path: 'add',
    component: DepartmentMasterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: DepartmentMasterComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
