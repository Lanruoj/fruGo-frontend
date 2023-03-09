describe("Base test", () => {
  it("Loads home page", () => {
    cy.visit("http://localhost:3000");
    cy.get(".sc-ezOQGI")
      .should("contain", "Home")
      .should("contain", "Login")
      .should("contain", "Products");
    cy.get(".sc-bYMpWt").should("contain", "fruGo");
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
    cy.get(".sc-hBxehG").should("contain", "Email:");
    cy.get(".sc-hBxehG").should("contain", "Password:");
  });
  it("Shows error for incorrect login details", () => {
    cy.get("input[name='email']").type("{enter}");
    cy.get(".sc-hBxehG > :nth-child(4)").should(
      "contain",
      "Please enter an email address"
    );
    cy.get("input[name='email']").type("incorrect_email@email.com{enter}");
    cy.get(".sc-hBxehG > :nth-child(4)").should(
      "contain",
      "Please enter a password"
    );
    cy.get("input[name='email']")
      .clear()
      .type("incorrect_email@email.com{enter}");
    cy.get("input[name='password']").clear().type("wrongpassword{enter}");
    cy.get(".sc-hBxehG > :nth-child(4)").should(
      "contain",
      "Email address does not exist"
    );
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']").clear().type("wrongpassword{enter}");
    cy.get(".sc-hBxehG > :nth-child(4)").should("contain", "Invalid password");
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get('[type="submit"]').contains("Login").click();
  });
});
