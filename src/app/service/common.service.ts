import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public api: string;
  constructor(
    private http: HttpClient,
  ) {
    this.api = '/api';
  }

  version() {
    return this.http.get(this.api + '/version');
  }
}
