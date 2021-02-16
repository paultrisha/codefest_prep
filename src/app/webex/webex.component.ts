import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NGXLogger } from 'ngx-logger';
import { Message } from '../models/message.model';
import { Room } from '../models/room.model';
import { WebexService } from '../services/webex.service';
@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.scss'],
})
export class WebexComponent implements OnInit {
  constructor(
    private webexService: WebexService,
    private logger: NGXLogger,
    private translate: TranslateService
  ) {}

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
  messages: Message[] = [];
  showMessageTab = false;

  ngOnInit() {
    this.loader = true;
    if (localStorage.getItem('access_token') == null) {
      this.webexService.beforeLogin();
      this.loader = false;
    } else {
      this.webexService.onInit();
      this.loader = false;
    }
  }

  createRoom() {
    if (this.roomName) {
      this.loader = true;
      this.webexService
        .createRoom(this.roomName)
        .then((data) => {
          this.loader = false;
          this.roomName = '';
          this.showAlertMessage = true;
          this.translate.get('ROOMCREATED').subscribe((value: any) => {
            this.dialogMessage = value;
          });
          this.logger.debug('New room created!');
        })
        .catch((data) => {
          this.loader = false;
          this.roomName = '';
          this.showAlertMessage = true;
          this.translate.get('ERROROCCURED').subscribe((value: any) => {
            this.dialogMessage = value;
          });
          this.logger.debug('Error occurred while creating room');
        });
    } else {
      this.showAlertMessage = true;
      this.translate.get('NOROOMNAME').subscribe((value: any) => {
        this.dialogMessage = value;
      });
      this.logger.debug('Bad request for room creation');
    }
  }

  listRooms() {
    this.loader = true;
    this.webexService
      .listRoom()
      .then((rooms) => {
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
      })
      .catch((error) => {
        this.logger.debug('Error occured while loading contacts');
        this.loader = false;
      });
  }

  addMemebersToSpace() {
    if (this.selectedRoomId && this.memberEmail) {
      this.loader = true;
      this.webexService
        .addMember(this.selectedRoomId, this.memberEmail)
        .then((data) => {
          this.loader = false;
          this.memberEmail = '';
          this.showAlertMessage = true;
          this.translate.get('MEMBERADDED').subscribe((value: any) => {
            this.dialogMessage = value;
          });
          this.logger.debug('Member added successfully!');
        })
        .catch((data) => {
          this.loader = false;
          if (
            data.message.includes(
              '1:1 conversation already has the maximum number of participants'
            )
          ) {
            this.memberEmail = '';
            this.showAlertMessage = true;
            this.translate.get('MAXMEMBER').subscribe((value: any) => {
              this.dialogMessage = value;
            });
            this.logger.debug('Error occurred while adding member');
          } else {
            this.memberEmail = '';
            this.showAlertMessage = true;
            this.translate
              .get('ERROROCCUREDADDMEMBER')
              .subscribe((value: any) => {
                this.dialogMessage = value;
              });
            this.logger.debug('Error occurred while adding member');
          }
        });
    } else {
      this.showAlertMessage = true;
      this.translate.get('NOEMAILID').subscribe((value: any) => {
        this.dialogMessage = value;
      });
      this.logger.debug('Bad request for adding memeber');
    }
  }

  sendMessageToSpace() {
    if (this.selectedRoomId && this.message) {
      this.loader = true;
      this.webexService
        .sendMessage(this.message, this.selectedRoomId)
        .then((data) => {
          this.loader = false;
          this.message = '';
          this.showAlertMessage = true;
          this.translate.get('MESSAGESENT').subscribe((value: any) => {
            this.dialogMessage = value;
          });
          this.logger.debug('Meesage sent!');
        })
        .catch((data) => {
          this.loader = false;
          this.message = '';
          this.showAlertMessage = true;
          this.translate.get('ERROROCCURED').subscribe((value: any) => {
            this.dialogMessage = value;
          });
          this.logger.debug('Error occurred while sending message member');
        });
    } else {
      this.showAlertMessage = true;
      this.translate.get('NOMESSAGE').subscribe((value: any) => {
        this.dialogMessage = value;
      });
      this.logger.debug('Bad request for sending message');
    }
  }

  loadMessages() {
    this.loader = true;
    this.messages = [];
    this.webexService
      .listMessage(this.selectedRoomId)
      .then((messages) => {
        let i = 0;
        for (const item of messages.items) {
          this.messages[i] = new Message();
          this.messages[i].personEmail = item.personEmail;
          this.messages[i].created = item.created;
          this.messages[i].text = item.text;
          i++;
        }
        this.loader = false;
        this.showMessageTab = true;
      })
      .catch((error) => {
        this.logger.debug('Error occured while loading messages');
        this.loader = false;
      });
  }

  onSpaceClose() {
    this.showMessageTab = false;
  }

  okDialogAction() {
    this.showAlertMessage = false;
  }
}
