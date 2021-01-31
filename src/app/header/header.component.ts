import { Component, OnInit } from '@angular/core';
import { WebexService } from '../services/webex.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private webexService: WebexService) {}

  showAlertMessage = false;
  dialogMessage;
  userName = '';
  userInitials = '';

  ngOnInit() {
    this.dialogMessage = 'Welcome to Webex !';
    this.showAlertMessage = true;
  }

  logout() {
    this.webexService.logout();
  }

  okDialogAction() {
    this.webexService.getLoginUserDetail().then((data) => {
      this.userName = data.displayName;
      this.userInitials = data.firstName.charAt(0) + data.lastName.charAt(0);
    });
    this.showAlertMessage = false;
  }
}
