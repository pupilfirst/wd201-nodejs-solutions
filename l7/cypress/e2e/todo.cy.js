describe("Todo Express application", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("STUDENT_SUBMISSION_URL"));
  });

  it("contains a header h1 tag with content - This is my Todo Application", () => {
    cy.get("h1").contains("This is my Todo Application");
  });

  it("contains a table element to list the todo items", () => {
    cy.get("table").should("be.visible");
  });

  it("contains a footer h1 tag with content - Built with Node.js", () => {
    cy.get("h1").contains("Built with Node.js");
  });
});
