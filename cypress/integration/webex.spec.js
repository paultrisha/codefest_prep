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
});
