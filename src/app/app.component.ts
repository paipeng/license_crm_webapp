import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'IdcardCRM';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['zh', 'en']);
    this.translate.setDefaultLang('zh');
    const browerLang = this.translate.getBrowserLang();
    this.translate.use(browerLang.match(/zh|en/) ? browerLang : 'zh');
  }
}
