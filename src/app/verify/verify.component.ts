import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenseBase64 } from '../models/licensebase64.model';
import { DialogService } from '../service/dialog.service';
import { LicenseService } from '../service/license.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  licenseBase64: LicenseBase64;
  uploadFilePath: string;
  constructor(
    private router: Router,
    private dialog: DialogService,
    private activatedRoute: ActivatedRoute,
    private licenseService: LicenseService
  ) {
    this.licenseBase64 = new LicenseBase64();
    this.uploadFilePath = '';
  }

  ngOnInit(): void {
  }

  verifyLicense() {

  }

  uploadFile() {


  }

  goBack() {
    this.router.navigate(['/licenses']);
  }
}
