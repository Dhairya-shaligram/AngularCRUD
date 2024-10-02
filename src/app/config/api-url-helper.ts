import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUrlHelper {
  public apiUrl = {
    account: {
      forgotPassword: 'account/forgot-password',
      changePassword: 'account/change-password',
      loginUser: 'account/login',
      resetPassword: 'account/reset-password'
    },
    employee: {
        getEmployees: 'employee/list',
        saveEmployee: 'employee/SaveEmployee',
        getDepartmentList: 'employee/department-list',
        deleteEmployee: 'employee/delete',
        checkEmailIdExist: 'employee/CheckEmployeeEmailExist'
    },
    department: {
        getDepartments: 'department/list',
        saveDepartment: 'department/save',
        get: 'department/GetUserList',
        deleteDepartment: 'department/delete',
        checkDepartmentExist: 'department/CheckDepartmentExist'
    },
    user: {
      saveUser: 'user/SaveUser',
      getUserList: 'user/GetUserList',
      deleteUser: 'user/deleteUser',
    },
  };
}
