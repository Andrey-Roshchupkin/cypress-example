describe("Form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
    cy.get('input[type="text"]').as("subscribe-input");
  });

  it("Test subscribe form positive scenario", () => {
    cy.get("h1")
      .contains(/testing forms/i)
      .should("be.visible");
    cy.get("@subscribe-input").type("johndoe@gmail.com");
    cy.contains("Successfully subbed: johndoe@gmail.com!").should("not.exist");
    cy.get('button[type="button"]').click();
    cy.contains("Successfully subbed: johndoe@gmail.com!").should("exist");
    cy.wait(3000);
    cy.contains("Successfully subbed: johndoe@gmail.com!").should("not.exist");
  });

  it("Test subscribe form negative scenario", () => {
    cy.get("h1")
      .contains(/testing forms/i)
      .should("be.visible");
    cy.get("@subscribe-input").type("johndoe@gmail.io");
    cy.contains("Invalid email: johndoe@gmail.io!").should("not.exist");
    cy.get('button[type="button"]').click();
    cy.contains("Invalid email: johndoe@gmail.io!").should("exist");
    cy.wait(3000);
    cy.contains("Invalid email: johndoe@gmail.io!").should("not.exist");
  });
});
