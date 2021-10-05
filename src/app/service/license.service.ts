import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { License } from '../models/license.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  apiPath: string = '/licenses';
  constructor(
    private http: HttpClient,
    private common: CommonService
  ) { }


  query() {
    return this.http.get<Array<License>>(this.common.api + this.apiPath);
  }


  get(id: string) {
    return this.http.get<License>(this.common.api + this.apiPath + '/' + id);
  }

  create(license: License) {
    return this.http.post<License>(this.common.api + this.apiPath, license);
  }

  update(id: string, license: License) {
    return this.http.put<License>(this.common.api + this.apiPath + '/' + id, license);
  }

}
