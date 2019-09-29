describe('page transition', () => {
  const baseUrl = Cypress.env('baseUrl');

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('page transition', () => {
    // cy.get('').click();
    // cy.location('pathname').should('eq', '');
  });
});
