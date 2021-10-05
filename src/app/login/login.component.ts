import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { DialogService } from '../service/dialog.service';
import { StorageService } from '../service/storage.service';
import { UserService } from '../service/user.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private common: CommonService,
    private dialog: DialogService,
    private router: Router,
    private storage: StorageService
  ) {
    this.formModel = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });

    this.passwordFlag = true;
    this.saveUsername = false;
    this.passwordImage = '../erp/assets/images/password_hide.png';
    this.codeImage = '';
  }

  ngOnInit(): void {
  }

  goWebsite() {

  }

  changePasswordFlag() {

  }


  keypress(event: any) {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  login() {
    var that = this;
    this.userService.login(this.formModel.value).subscribe((res: any) => {
      that.dialog.closeDialogNow();
      that.checkChanged();
      that.storage.setItem('token', { token: res.user.token });
      that.storage.setItem('user', res.user);

      that.router.navigate(['/activities']);
    }, (error) => {
      that.dialog.closeDialogNow();
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
}
