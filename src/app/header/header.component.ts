import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User = new User();
  constructor(
    private router: Router,
    private storage: StorageService
  ) {

  }

  ngOnInit(): void {
    if (this.storage.getUser() !== null) {
      this.user = this.storage.getUser();
    }
  }

  logout() {
    this.storage.removeItem('token');
    this.storage.removeItem('user');
    this.router.navigate(['login']);
  }
}
