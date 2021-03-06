import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { License } from '../models/license.model';
import { LicenseBase64 } from '../models/licensebase64.model';
import { DialogService } from '../service/dialog.service';
import { LicenseService } from '../service/license.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  licenseBase64: LicenseBase64 | undefined;
  uploadFilePath: string;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  fileAttr = 'Choose File';
  license: License | undefined;

  constructor(
    private router: Router,
    private dialog: DialogService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private licenseService: LicenseService
  ) {
    this.licenseBase64 = new LicenseBase64();
    this.uploadFilePath = '';
  }

  ngOnInit(): void {
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      /*
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });
      */
      this.fileAttr += imgFile.target.files[0].name;
      console.info('file: ' + this.fileAttr);
      this.uploadFilePath = imgFile.target.files[0].name;

      // HTML5 FileReader API
      var that = this;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        var data = e.target.result;

        console.info('data: ' + data);
        that.licenseBase64!.base64 = data;
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput!.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  verifyLicense() {
    this.licenseService.verify(this.licenseBase64!).subscribe((license: License) => {
      console.info('verifyLicense: ' + license.signature);
      this.license = license;
    }, (error) => {
      console.info('verifyLicense error: ' + error.status);
      this.dialog.openMessageDialog({
        title:
          this.translate.instant('license_verify')
        , message: this.translate.instant('license_verify_error')
      })
    });
  }

  uploadFile() {

  }

  goBack() {
    this.router.navigate(['/licenses']);
  }

  clear() {
    this.licenseBase64 = new LicenseBase64;
    this.license = undefined;
    this.uploadFilePath = '';
  }
}
