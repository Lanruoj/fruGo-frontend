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
