describe("Base test", () => {
  it("Loads home page", () => {
    cy.visit("http://localhost:3000");
    cy.get("nav")
      .should("contain", "Home")
      .should("contain", "Login")
      .should("contain", "Products");
    cy.get("h1").should("contain", "fruGo");
    cy.contains("WELCOME");
  });
});

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[value="/login"]').click();
  });
  it("Loads login page", () => {
    cy.contains("Login");
    cy.get("form").should("contain", "Email:");
    cy.get("form").should("contain", "Password:");
  });
  it("Shows error for incorrect login details", () => {
    cy.get("input[name='email']").type("{enter}");
    cy.get("#error-message").should("contain", "Please enter an email address");
    cy.get("input[name='email']").type("incorrect_email@email.com{enter}");
    cy.get("#error-message").should("contain", "Please enter a password");
    cy.get("input[name='email']")
      .clear()
      .type("incorrect_email@email.com{enter}");
    cy.get("input[name='password']").clear().type("wrongpassword{enter}");
    cy.get("#error-message").should("contain", "Email address does not exist");
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']").clear().type("wrongpassword{enter}");
    cy.get("#error-message").should("contain", "Invalid password");
  });
  it("Successfully logs in user", () => {
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get('[type="submit"]').contains("Login").click();
    cy.get("#test-user-logo").contains("Welcome, John");
    cy.get("button").contains("Logout");
  });
});
