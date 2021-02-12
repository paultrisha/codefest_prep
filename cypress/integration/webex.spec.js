describe('Webex Spec', () => {
	beforeEach(() => {
	});

	before(() => {
	});
	let access_token;
	
	context('WebexApp Features Sanity', () => {
		it('Loads the webex app', () => {
			cy.clearCookies()
			console.log('access_token'+ access_token)
			window.localStorage.setItem('access_token', Cypress.env('access_token'));
			cy.visit('http://localhost:4200/#access_token='+ Cypress.env('access_token'))
		});
		it('It should be on welcome page', () => {
			cy.contains('Welcome');
			cy.get('button[id="ok-btn"]').click();
		});

		it('It should create room', () => {
			cy.get('input[id="roomName"]').type('my test room').should('have.value', 'my test room');
			cy.get('button[id="createRoom"]').click();
			cy.intercept({
				method: 'POST',
    			url: 'https://api.ciscospark.com/v1/rooms',
			}).as('createRoom')
			cy.wait('@createRoom')
			cy.contains('Room created !');
			cy.get('button[id="ok-btn"]').click();
		});

		it('It should load contacts', () => {
			cy.get('button[id="listRoom"]').click();
			cy.intercept('https://hydra-a.wbx2.com/v1/rooms').as('listRooms')
			//cy.wait('@listRooms')
		});
		
		it('It should add member to space', () => {
			cy.get('select').select('my test room');
			cy.get('input[id="memberEmail"]').type('test@c.com').should('have.value', 'test@c.com');
			cy.get('button[id="addMember"]').click();
			cy.intercept({
				method: 'POST',
    			url: 'https://hydra-a.wbx2.com/v1/memberships',
			}).as('addMember')
			// cy.wait('@addMember')
			cy.contains('Member added !');
			cy.get('button[id="ok-btn"]').click();
		});
		
		it('It should send message', () => {
			cy.get('select').select('my test room');
			cy.get('input[id="message"]').type('Hello !').should('have.value', 'Hello !');
			cy.get('button[id="sendMessage"]').click();
			cy.intercept({
				method: 'POST',
    			url: 'https://hydra-a.wbx2.com/v1/messages',
			}).as('sendMessage')
			// cy.wait('@sendMessage')
			cy.contains('Message sent !');
			cy.get('button[id="ok-btn"]').click();
		});

		it('It should alert user if no member is added to space but the button is clicked', () => {
			cy.get('select').select('my test room');
			cy.get('button[id="addMember"]').click();
			cy.contains('Please select room & enter member email Id');
			cy.get('button[id="ok-btn"]').click();
		});

		it('It should alert user if no message is typed but the send button is clicked', () => {
			cy.get('select').select('my test room');
			cy.get('button[id="sendMessage"]').click();
			cy.contains('Please select room & enter message to be send');
			cy.get('button[id="ok-btn"]').click();
		});

		it('It should alert user if no space name is entered to create a space but the button is clicked', () => {
			cy.get('button[id="createRoom"]').click();
			cy.contains('Please enter room name');
			cy.get('button[id="ok-btn"]').click();
		});

		it('It should alert user if member is added to individual contact ', () => {
			cy.get('select').select('Mina Yoo');
			cy.get('input[id="memberEmail"]').type('tripaul@cisco.com').should('have.value', 'tripaul@cisco.com');
			cy.get('button[id="addMember"]').click();
			cy.intercept({
				method: 'POST',
    			url: 'https://hydra-a.wbx2.com/v1/memberships',
			}).as('addMember')
			// cy.wait('@addMember')
			cy.contains('Conversation already has maximum number of participants');
			cy.get('button[id="ok-btn"]').click();
		});
	});

});
