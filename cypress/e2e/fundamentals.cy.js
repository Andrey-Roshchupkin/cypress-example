describe("Fundamental test", () => {
  beforeEach(() => {
    cy.visit("/fundamentals");
  });
  it("Has correct header text", () => {
    cy.get("h1.fundamentals_header__yRsdA").should(
      "contain.text",
      "Testing Fundamentals"
    );
  });

  it("Accordion works correctly", () => {
    cy.contains(/Cypress gives you various commands to help you test/i).should(
      "not.be.visible"
    );
    cy.getAccordionItem(3).click();
    cy.contains(/Cypress gives you various commands to help you test/i).should(
      "be.visible"
    );
    cy.getAccordionItem(3).click();
    cy.contains(/Cypress gives you various commands to help you test/i).should(
      "not.be.visible"
    );
  });
});
