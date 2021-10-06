import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Version } from '../models/version.model';
import { CommonService } from '../service/common.service';
import { DialogService } from '../service/dialog.service';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';
import { VersionService } from '../service/version.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  passwordFlag: boolean;
  saveUsername: boolean;
  passwordImage: string;
  codeImage: string;
  version: Version = new Version();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private common: CommonService,
    private dialog: DialogService,
    private router: Router,
    private storage: StorageService,
    private versionService: VersionService
  ) {
    this.formModel = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.passwordFlag = true;
    this.saveUsername = false;
    this.passwordImage = 'assets/images/password_hide.png';
    this.codeImage = '';
  }

  ngOnInit(): void {
    this.getVersion();
  }

  goWebsite() {

  }

  changePasswordFlag() {
    this.passwordFlag = !this.passwordFlag;
    if (this.passwordFlag) {
      this.passwordImage = 'assets/images/password_hide.png';
    } else {
      this.passwordImage = 'assets/images/password_show.png';
    }
  }


  keypress(event: any) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  login() {
    var that = this;
    this.userService.login(this.formModel.value).subscribe((user: User) => {
      console.info('login success: ' + user.token)
      // that.dialog.closeDialogNow();
      // that.dialog.openMessageDialog({ title: 'login success', message: user.email });
      that.checkChanged();
      that.storage.setItem('token', { token: user.token });
      that.storage.setItem('user', user);

      that.router.navigate(['/licenses']);
    }, (error) => {
      console.error('login failed: ' + error.status)
      that.dialog.closeDialogNow();
      that.dialog.openMessageDialog({ title: 'login failed', message: 'incorrect username or password' });
      that.getCode();

      that.storage.removeItem('token');
      that.storage.removeItem('user');
      // that.formModel.reset();
      const username1 = that.formModel.value.username;
      that.formModel = that.formBuilder.group({
        password: '',
        code: '',
        username: username1
      });
    });
  }


  getCode() {

  }

  checkChanged() {
    if (this.saveUsername) {
      // this.cookie.set('lotteryUserName', this.formModel.value.username);
    } else {
      // this.cookie.delete('lotteryUserName');
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
