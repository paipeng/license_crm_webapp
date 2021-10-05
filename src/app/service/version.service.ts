import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Version } from '../models/version.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(
    private common: CommonService,
    private http: HttpClient
  ) { }

  getVersion() {
    return this.http.get<Version>(this.common.api + '/version');
  }
}
