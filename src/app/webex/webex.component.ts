import { Component, OnInit } from '@angular/core';
import Webex from 'webex';
import { Room } from '../models/room.model';
@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.scss'],
})
export class WebexComponent implements OnInit {
  constructor() {}

  loader = false;
  userName = null;
  webex;
  roomName;
  roomsPresent = [];
  memberEmail;
  room: Room[] = [{ id: '1234', title: '--- Select a room ---' }];
  message;
  showAlertMessage = false;
  dialogMessage;
  selectedRoomId = '1234';

  ngOnInit() {
    const redirect_uri = `http://localhost:4200/`;
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB',
        },
        credentials: {
          client_id:
            'C9535bae245754ff496bd1756819c905fc8462f0f7398ef89079d1a8445c1612c',
          redirect_uri: redirect_uri,
          scope: 'spark:all spark:kms',
        },
      },
    });
    this.webex.once(`ready`, () => {
      if (this.webex.credentials.supertoken) {
        localStorage.setItem(
          'access_token',
          this.webex.credentials.supertoken.access_token
        );
      } else {
        this.webex.authorization.initiateLogin();
      }
    });

    if (localStorage.getItem('access_token')) {
      console.log('check');
      this.webex.people.get('me').then((data) => {
        this.userName = data.displayName;
        console.log(this.userName);
        this.loader = false;
        console.log(this.loader);
      });
    }
  }

  createRoom() {
    if (this.roomName) {
      this.webex.rooms.create({ title: this.roomName });
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please enter room name';
    }
  }

  listRooms() {
    this.webex.rooms.list().then((rooms) => {
      sessionStorage.setItem('room', rooms);
      let i = 0;
      for (const item of rooms.items) {
        this.room[i] = new Room();
        this.room[i].title = item.title;
        this.room[i].id = item.id;
        i++;
      }
    });
  }

  addMemebersToSpace() {
    if (this.selectedRoomId && this.memberEmail) {
      this.webex.memberships.create({
        roomId: this.selectedRoomId,
        personEmail: this.memberEmail,
      });
      this.memberEmail = '';
      this.showAlertMessage = true;
      this.dialogMessage = 'Member added !';
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please select room & enter member email Id';
    }
  }

  sendMessageToSpace() {
    if (this.selectedRoomId && this.message) {
      this.webex.messages.create({
        markdown: this.message,
        roomId: this.selectedRoomId,
      });
      this.message = '';
      this.showAlertMessage = true;
      this.dialogMessage = 'Message sent !';
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please select room & enter message to be send';
    }
  }

  logout() {
    this.webex.logout();
    localStorage.removeItem('access_token');
  }

  okDialogAction() {
    this.showAlertMessage = false;
  }
}
