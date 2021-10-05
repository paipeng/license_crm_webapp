import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Version } from '../models/version.model';

import { StorageService } from '../service/storage.service';
import { VersionService } from '../service/version.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  version: Version | undefined;
  user: User | undefined;

  constructor(
    private router: Router,
    private storage: StorageService,
    private versionService: VersionService
  ) {
    this.version = new Version();
  }

  ngOnInit(): void {
    this.getVersion();
    this.user = this.storage.getItem('user');
    if (this.user == undefined) {
      this.router.navigate(['login']);
    }
  }

  getVersion() {
    const that = this;
    this.versionService.getVersion().subscribe((version: Version) => {
      console.log(version);
      that.storage.setItem('version', version);
      that.version = version;
    }, () => {
      that.storage.removeItem('version');
    });
  }
}
