import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    var itemJson = localStorage.getItem(key);
    return JSON.parse(itemJson!);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
