import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { License } from '../models/license.model';
import { DialogService } from '../service/dialog.service';
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
    private dialog: DialogService,
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
    const that = this;
    if (!this.id) {
      this.licenseService.create(this.license!).subscribe((license: License) => {
        that.license = license;
        that.id = String(license.id);
        //that.router.navigate(['/activity', license!.id]);
      }, (error) => {
        if (error.status === 400 || error.status === 403 || error.status === 404) {
          that.dialog.openMessageDialog({
            title: '创建失败',
            message: error.status
          });
        } else {
          that.dialog.openMessageDialog({
            title: '创建失败',
            message: '服务器异常,请联系管理员'
          });
        }
      });
    } else {
      this.licenseService.update(this.id, this.license!).subscribe((license: License) => {
        that.license = license;
        that.dialog.openMessageDialog({
          title: 'License "' + that.license.owner + '" 保存成功',
          message: ''
        });
        that.dialog.closeDialog();
      }, (error) => {

        if (error.status === 400 || error.status === 403 || error.status === 404) {
          that.dialog.openMessageDialog({
            title: 'License "' + that.license!.owner + '" 保存失败',
            message: error.status
          });
        } else {
          that.dialog.openMessageDialog({
            title: 'License "' + that.license!.owner + '" 保存失败',
            message: error.status
          });
        }
      });
    }
  }

  genLicense() {
    console.info('genLicense');
  }

  downloadLicense() {
    console.info('downloadLicense');

  }
}
