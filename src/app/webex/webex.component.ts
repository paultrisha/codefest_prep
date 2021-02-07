import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import Webex from 'webex';
import { Room } from '../models/room.model';
import { WebexService } from '../services/webex.service';
@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.scss'],
})
export class WebexComponent implements OnInit {
  constructor(private webexService: WebexService, private logger: NGXLogger) {}

  loader = false;
  webex;
  roomName;
  roomsPresent = [];
  memberEmail;
  room: Room[] = [{ id: '1234', title: '--- Select a room ---' }];
  message;
  showAlertMessage = false;
  dialogMessage;
  selectedRoomId = '1234';
  webexSpace = false;
  result;

  ngOnInit() {
    this.webexService.beforeLogin();
  }

  createRoom() {
    if (this.roomName) {
      this.webexService.createRoom(this.roomName);
      this.roomName = '';
      this.showAlertMessage = true;
      this.dialogMessage = 'Room created !';
      this.logger.debug('New room created!');
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please enter room name';
      this.logger.debug('Bad request for room creation');
    }
  }

  listRooms() {
    this.loader = true;
    this.webexService.listRoom().then((rooms) => {
      let i = 0;
      for (const item of rooms.items) {
        this.room[i] = new Room();
        this.room[i].title = item.title;
        this.room[i].id = item.id;
        i++;
      }
      this.selectedRoomId = this.room[0].id;
      this.loader = false;
      this.webexSpace = true;
    });
  }

  addMemebersToSpace() {
    if (this.selectedRoomId && this.memberEmail) {
      this.result = this.webexService.addMember(
        this.selectedRoomId,
        this.memberEmail
      );
      if ((this.result == 'error occured')) {
        this.memberEmail = '';
        this.showAlertMessage = true;
        this.dialogMessage =
          'Conversation already has maximum number of participants';
        this.logger.debug('Error occurred while adding member');
      } else {
        this.memberEmail = '';
        this.showAlertMessage = true;
        this.dialogMessage = 'Member added !';
        this.logger.debug('Member added successfully!');
      }
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please select room & enter member email Id';
      this.logger.debug('Bad request for adding memeber');
    }
  }

  sendMessageToSpace() {
    if (this.selectedRoomId && this.message) {
      this.webexService.sendMessage(this.message, this.selectedRoomId);
      this.message = '';
      this.showAlertMessage = true;
      this.dialogMessage = 'Message sent !';
      this.logger.debug('Meesage sent!');
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please select room & enter message to be send';
      this.logger.debug('Bad request for sending message');
    }
  }

  okDialogAction() {
    this.showAlertMessage = false;
  }
}
