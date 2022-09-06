describe("", () => {
  it("The server is accessible at the port specified in the input argument", () => {
    cy.visit("http://localhost:8080");
  });

  it("When the home page is visited, it should have the link to the project page", () => {
    cy.visit("http://localhost:8080");
    cy.get('a[href*="/project"]').click();
  });

  it("When the project page is visited, it should have the link to the registration page", () => {
    cy.visit("http://localhost:8080/project");
    cy.get('a[href*="/registration"]').click();
  });

  it("The registration page has already implemented form and input fields", () => {
    cy.visit("http://localhost:8080/registration");
    cy.get("#name").type("Admin User 2");
    cy.get("#email").type("admin2@example.com");
    cy.get("#password").type("Test@321");
    cy.get("#dob").click().type("1990-02-02");
    cy.get("input[type=checkbox]").check();
    cy.get("[type='submit']").click();
  });
});
