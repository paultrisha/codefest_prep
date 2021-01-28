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
  room: Room[] = [];
  message;
  showAlertMessage = false;
  dialogMessage;
  selectedRoomId;

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
      // console.log('READY', this.webex.credentials.supertoken)
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
    this.webex.rooms.list({ max: 10 }).then((rooms) => {
      let i = 0;
      for (const item of rooms.items) {
        this.room[i] = new Room();
        this.room[i].title = item.title;
        this.room[i].id = item.id;
        i++;
      }
    });
  }

  // testaddMemebersToSpace(email) {
  // 	this.webex.rooms.create({ title: `My First Room` }).then((room) => {
  // 		return Promise.all([
  // 			this.webex.memberships.create({
  // 				roomId: room.id,
  // 				personEmail: email,
  // 			}),
  // 		]).then(() =>
  // 			this.webex.messages.create({
  // 				markdown: `**Created the space and added you using webex SDK**`,
  // 				roomId: room.id,
  // 			})
  // 		);
  // 	});
  // }

  addMemebersToSpace() {
    if (this.selectedRoomId && this.memberEmail) {
      this.webex.memberships.create({
        roomId: this.selectedRoomId,
        personEmail: this.memberEmail,
      });
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
