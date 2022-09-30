describe("Todo Express application", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("STUDENT_SUBMISSION_URL"));
  });

  it("contains a table element to list the todo items", () => {
    cy.get("table").should("be.visible");
  });

  it("contains a header element with content - This is my Todo Application", () => {
    cy.contains("This is my Todo Application");
  });

  it("contains a footer element with content - Built with Node.js", () => {
    cy.contains("Built with Node.js");
  });
});