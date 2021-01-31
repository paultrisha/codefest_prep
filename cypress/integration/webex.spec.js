describe('Webex Spec', () => {
	beforeEach(() => {
	});

	before(() => {
	});

	context('Basic Loading Sanity', () => {
		it('Loads the app', () => {
			cy.clearCookies()
			cy.visit('http://localhost:4200/')
		});
	});

	// context('Should login', () => {
	// 	it('Perform login', () => {
	// 		cy.get('input[id="IDToken1"]').type('test@ciscotac.net').should('have.value', 'test@ciscotac.net');
	// 		cy.contains('Next').click;
	// 		cy.get('input[id="IDToken2"]').type('gwyDL123$').should('have.value', 'gwyDL123$');
	// 		cy.contains('Sign in').click;
	// 	});
	// });

});
