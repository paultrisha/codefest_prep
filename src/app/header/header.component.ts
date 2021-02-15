import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private webexService: WebexService,
    private logger: NGXLogger,
    private translate: TranslateService
  ) {}

  showAlertMessage = false;
  dialogMessage;
  userName = '';
  userInitials = '';

  ngOnInit() {
    this.translate.get('WELCOME').subscribe((data: any) => {
      this.dialogMessage = data;
    });
    this.showAlertMessage = true;
  }

  logout() {
    this.logger.debug('User logged out!');
    this.webexService.logout();
  }

  okDialogAction() {
    this.webexService.getLoginUserDetail().then((data) => {
      this.logger.debug('User details fetched!');
      this.userName = data.displayName;
      this.userInitials = data.firstName.charAt(0) + data.lastName.charAt(0);
    });
    this.showAlertMessage = false;
  }
}
