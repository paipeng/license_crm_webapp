import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { License } from '../models/license.model';
import { LicenseService } from '../service/license.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {
  id: string | null;
  datePipe = new DatePipe('en-US');
  license: License | null;
  tabIndex: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private licenseService: LicenseService
  ) {
    this.id = null;
    this.license = new License();
    this.tabIndex = 0;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== null && this.id !== '0') {
      this.getLicenseById(this.id);
    } else {
      this.id = null;
      this.license = new License();
    }
  }

  getLicenseById(id: string) {
    this.licenseService.get(id!).subscribe((license: License) => {
      console.info('getLicenseById: ' + license.owner);
      this.license = license;
    }, (error) => {

    });

  }

  checkLicenseOwner() {

  }

  goBack() {
    this.router.navigate(['/licenses']);
  }

  saveLicense() {

  }
}
