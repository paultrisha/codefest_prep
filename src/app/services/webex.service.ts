import { Injectable } from '@angular/core';
import Webex from "webex";

@Injectable({
	providedIn: 'root'
})
export class WebexService {

	constructor() { }

	webex;

	loginto() {
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
					//return data.dispayName;
				});
			} else {
				this.webex.authorization.initiateLogin();
			}
		});
	}
}
