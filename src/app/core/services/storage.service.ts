import { Injectable } from '@angular/core';
import { CommonService } from './commonservice.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private commonService: CommonService) {}

  getValue(key: string): any {
    if (key === StorageKey.loginData) {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        const decryptedValue = this.commonService.Decrypt(storedValue);
        return decryptedValue ? JSON.parse(decryptedValue) : '';
      }
      return '';  // Handle case where no data is found
    } else {
      const loginDataEncrypted = localStorage.getItem(StorageKey.loginData);
      if (loginDataEncrypted) {
        const loginData = JSON.parse(this.commonService.Decrypt(loginDataEncrypted));
        if (loginData && loginData[key]) {
          return loginData[key];
        }
      }
      return '';  // Return empty or default value if key is not found
    }
  }

  setValue(key: string, value: any): void {
    let newValue = '';
    if (typeof value === 'object') {
      newValue = this.commonService.Encrypt(JSON.stringify(value));
    } else {
      newValue = this.commonService.Encrypt(value);
    }
    localStorage.setItem(key, newValue);
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}

export class StorageKey {
  public static loginData = 'LoginData';
  public static branchId = 'BranchId';
} 