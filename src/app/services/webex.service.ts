import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Webex from 'webex';

@Injectable({
  providedIn: 'root',
})
export class WebexService {
  constructor() {}

  webex;

  beforeLogin() {
    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: 'WEB',
        },
        credentials: {
          client_id: environment.CLIENTID,
          redirect_uri: environment.REDIRECTURL,
          scope: environment.SCOPE,
        },
      },
    });
    this.listenForWebex();
  }

  async listenForWebex() {
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
  }

  async createRoom(roomName) {
    this.webex.rooms.create({ title: roomName });
  }

  async sendMessage(message, selectedRoomId) {
    this.webex.messages.create({
      markdown: message,
      roomId: selectedRoomId,
    });
  }

  async addMember(selectedRoomId, memberEmail) {
    this.webex.memberships
      .create({
        roomId: selectedRoomId,
        personEmail: memberEmail,
      })
      .catch((data) => {
        return 'error occured';
      });
  }

  async getLoginUserDetail() {
    return this.webex.people.get('me');
  }

  async listRoom() {
    return this.webex.rooms.list();
  }

  logout() {
    this.webex.logout();
    localStorage.removeItem('access_token');
  }
}
