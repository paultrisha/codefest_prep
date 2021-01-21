import { Component, OnInit } from '@angular/core';
import Webex from "webex";
import { Room } from '../models/room.model';

@Component({
	selector: 'app-webex',
	templateUrl: './webex.component.html',
	styleUrls: ['./webex.component.scss']
})
export class WebexComponent implements OnInit {

	constructor() { }

	loader = false;
	userName = null;
	item = 0;
	webex;
	roomName;
	roomsPresent = [];
	memberEmail;
	room: Room = new Room();
	message;
	showAlertMessage = false;
	dialogMessage;

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
				this.webex.people.get('me').then(data => {
					this.userName = data.displayName;
					console.log(this.userName);
					this.loader = false;
				});
			} else {
				this.webex.authorization.initiateLogin();
			}
		});
	}

	createRoom() {
		if (this.roomName) {
			this.webex.rooms.create({ title: this.roomName });
		}
	}

	listRooms() {
		this.webex.rooms.list({ max: 10 }).then((rooms) => {
			this.item = 0;
			for (let room of rooms.items) {
				this.room.title = room.title;
				this.room.id = room.id;
				this.item++;
			}
			console.log('tt', this.room);
		});
	}

	testaddMemebersToSpace(email) {
		this.webex.rooms.create({ title: `My First Room` }).then((room) => {
			return Promise.all([
				this.webex.memberships.create({
					roomId: room.id,
					personEmail: email,
				}),
			]).then(() =>
				this.webex.messages.create({
					markdown: `**Created the space and added you using webex SDK**`,
					roomId: room.id,
				})
			);
		});
	}

	addMemebersToSpace() {
		console.log(this.room.id);
		console.log(this.memberEmail);
		if (this.room.id && this.memberEmail) {
			this.webex.memberships.create({
				roomId: this.room,
				personEmail: this.memberEmail,
			});
		} else {
			this.showAlertMessage = true;
			this.dialogMessage = 'Please select room & enter member email Id';
		}
	}

	sendMessageToSpace() {
		console.log(this.message);
		if (this.room.id && this.message) {
			this.webex.messages.create({
				markdown: this.message,
				roomId: this.room.id,
			});
		} else {
			this.showAlertMessage = true;
			this.dialogMessage = 'Please select room & enter message to be send';
		}
	}

	logout() {
		this.webex.logout();
		localStorage.removeItem("access_token");
	}

	okDialogAction() {
		this.showAlertMessage = false;
	}

}
