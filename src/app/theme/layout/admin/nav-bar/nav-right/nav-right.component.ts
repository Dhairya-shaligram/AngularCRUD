// angular import
import { Component } from '@angular/core';
import { LoginResponseModel } from 'src/app/core/model/login-model';
import { CommonService } from 'src/app/core/services/commonservice.service';
import {
  StorageKey,
  StorageService,
} from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.css'],
})
export class NavRightComponent {
  userFullName: string = '';
  constructor(
    private storageService: StorageService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    const loginData: LoginResponseModel = this.storageService.getValue(
      StorageKey.loginData,
    );
    if (loginData) {
      this.userFullName = loginData.FullName;
    }
  }
}
