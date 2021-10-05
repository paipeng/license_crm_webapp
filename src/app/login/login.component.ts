import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordFlag: boolean;
  saveUsername: boolean;
  passwordImage: string;
  codeImage: string;
  constructor() {

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
