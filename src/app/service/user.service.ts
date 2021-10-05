import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) { }


  login(user: User) {
    return this.http.post(this.common.api + '/login', user);
  }

}
