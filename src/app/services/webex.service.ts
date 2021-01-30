import { Injectable } from '@angular/core';
import Webex from 'webex';

@Injectable({
  providedIn: 'root',
})
export class WebexService {
  constructor() {}

  webex;

  beforeLogin() {
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
    this.webex.memberships.create({
      roomId: selectedRoomId,
      personEmail: memberEmail,
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
