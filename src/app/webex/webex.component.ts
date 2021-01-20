import { Component, OnInit } from '@angular/core';
import Webex from "webex";

@Component({
  selector: 'app-webex',
  templateUrl: './webex.component.html',
  styleUrls: ['./webex.component.scss']
})
export class WebexComponent implements OnInit {

  constructor() { }

  room;
  webex;
  roomName;
  roomsPresent;

  ngOnInit() {
	let redirect_uri = `http://localhost:4200/`;

    this.webex = Webex.init({
      config: {
        meetings: {
          deviceType: "WEB",
        },
        credentials: {
          client_id:
            "C9535bae245754ff496bd1756819c905fc8462f0f7398ef89079d1a8445c1612c",
          redirect_uri: redirect_uri,
          scope: "spark:all spark:kms",
        },
      },
    });
    this.webex.once(`ready`, () => {
      // console.log("READY", this.webex.credentials.supertoken)
      if (this.webex.credentials.supertoken) {
        localStorage.setItem(
          "access_token",
          this.webex.credentials.supertoken.access_token
        );
      } else {
        this.webex.authorization.initiateLogin();
      }
    });
  }

  createRoom() {
    if (this.roomName) {
      this.room = this.webex.rooms.create({ title: this.roomName });
    }
  }

  listRooms() {
    this.webex.rooms.list({ max: 10 }).then((rooms) => {
      this.roomsPresent = rooms.titles;
    });
  }

  addMemebersToSpace() {
    this.webex.rooms.create({ title: `My First Room` }).then((room) => {
      return Promise.all([
        this.webex.memberships.create({
          roomId: room.id,
          personEmail: `amanjain@cisco.com`,
        }),
      ]).then(() =>
        this.webex.messages.create({
          markdown: `**Created the space and added you using webex SDK**`,
          roomId: room.id,
        })
      );
    });
  }

  logout() {
    this.webex.logout();
    localStorage.removeItem("access_token");
  }

}
