import { Component, OnInit } from '@angular/core';
import Webex from 'webex';
import { Room } from '../models/room.model';
import { WebexService } from '../services/webex.service';
@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.scss'],
})
export class WebexComponent implements OnInit {
  constructor(private webexService: WebexService) {}

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

  ngOnInit() {
    this.webexService.beforeLogin();
  }

  createRoom() {
    if (this.roomName) {
      this.webexService.createRoom(this.roomName);
      this.roomName = '';
      this.showAlertMessage = true;
      this.dialogMessage = 'Room created !';
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please enter room name';
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
    });
  }

  addMemebersToSpace() {
    if (this.selectedRoomId && this.memberEmail) {
      this.webexService.addMember(this.selectedRoomId, this.memberEmail);
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
      this.webexService.sendMessage(this.message, this.selectedRoomId);
      this.message = '';
      this.showAlertMessage = true;
      this.dialogMessage = 'Message sent !';
    } else {
      this.showAlertMessage = true;
      this.dialogMessage = 'Please select room & enter message to be send';
    }
  }

  okDialogAction() {
    this.showAlertMessage = false;
  }
}
