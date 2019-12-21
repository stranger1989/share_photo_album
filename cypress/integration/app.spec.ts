describe('ユーザー認証系のテスト', () => {
  const baseUrl = Cypress.env('baseUrl');

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('input[data-test="username-input"]').type('test');
    cy.get('input[data-test="sign-in-password-input"]').type('test1234');
    cy.get('button[data-test="sign-in-sign-in-button"]').click();
    cy.wait(3000);
  });

  it('ログインのテスト', () => {});

  it('ログアウトのテスト', () => {
    cy.get('button[data-test="sign-out-button"]').click();
  });
});
