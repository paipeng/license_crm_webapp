import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

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

  setUser(value: User) {
    localStorage.setItem('user', JSON.stringify(value));
  }

  getUser(): User {
    var itemJson = localStorage.getItem('user');
    return JSON.parse(itemJson!);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
