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
  before(() => {
    cy.visit("http://localhost:3000");
    cy.get('[value="/login"]').click();
  });
  it("Loads login page", () => {
    cy.contains("Login");
    cy.get(".sc-gswNZR").should("contain", "Email:");
    cy.get(".sc-gswNZR").should("contain", "Password:");
  });
});
