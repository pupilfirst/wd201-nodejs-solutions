describe("Todo Express application Design Implementation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("contains a header h1 tag with the application title", () => {
    cy.get("h1");
  });

  it("contains three h5 tags for sections in the order Overdue, Due Today and Due Later", () => {
    cy.get("h5").should("have.length", 3);

    cy.get("h5").each((_section, _index, sections) => {
      let sectionTexts = ["Overdue", "Due Today", "Due Later"];
      sections.each((index, section) => {
        expect(sectionTexts[index]).to.equal(section.innerText);
      });
    });
  });

  it("contains a button to add a new todo item to the list with proper button text such as Add/Add Todo", () => {
    cy.get("button").contains("add", { matchCase: false });
  });

  it("contains a text field to input title of a new todo item", () => {
    cy.get('input[type*="text"]').should("be.visible");
  });
});
