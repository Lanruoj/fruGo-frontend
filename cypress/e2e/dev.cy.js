// DEVELOPMENT
const baseURL = "http://localhost:3000";
// PRODUCTION
// const baseURL = "https://frugo.netlify.app";

describe("Base test", () => {
  it("Loads home page", () => {
    cy.visit(baseURL);
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
    cy.visit(baseURL);
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
    cy.get('button[type="submit"]').contains("Login").click();
    cy.get("#test-user-logo").contains("Welcome, John");
    cy.get("button").contains("Logout");
  });
});

describe("Products", () => {
  it("Adds product to cart", () => {
    cy.visit(baseURL + "/login");
    cy.get("input[name='email']").clear().type(Cypress.env("TEST_USER_EMAIL"));
    cy.get("input[name='password']")
      .clear()
      .type(Cypress.env("TEST_USER_PASSWORD"));
    cy.intercept("**/auth/login").as("postLogin");
    cy.get('button[type="submit"]').contains("Login").click();
    cy.intercept("GET", "**/cart").as("getCart");
    cy.wait(["@postLogin", "@getCart"]);
    cy.get("button[value='/customer/cart'").contains("Cart").click();
    cy.get("#cart-product-list")
      .should("have.length.gte", 0)
      .invoke("text")
      .then(($text) => {
        cy.log($text);
        if ($text != "No products in cart") {
          cy.log($text);
          cy.intercept("DELETE", "**/cart/products?all=true**").as("clearCart");
          cy.get("#clear-cart-button").click();
          cy.wait("@clearCart");
        }
      });
    cy.get("#cart-product-list").children().should("have.length", 0);
    cy.intercept("GET", "**/products**").as("getProducts");
    cy.get("button[value='/customer/products'").click();
    cy.wait("@getProducts");
    cy.wait(2000);
    cy.intercept("POST", "**/cart/products").as("postProduct");
    cy.get(".add-to-cart-button").first().click();
    cy.wait(2000);
    cy.get("button[value='/customer/cart'").contains("Cart").click();
    cy.get("#cart-product-list>.cart-product").should("have.length", 1);
  });
});
