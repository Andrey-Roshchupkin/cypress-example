describe("Various examples", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("multi-page testing", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/");
    cy.get("a").contains("Overview").trigger("mouseover").click();
    cy.location("pathname").should("equal", "/overview");
    cy.get("a").contains("Fundamentals").trigger("mouseover").click();
    cy.location("pathname").should("equal", "/fundamentals");
    cy.get("a").contains("Forms").trigger("mouseover").click();
    cy.location("pathname").should("equal", "/forms");
    cy.get("a").contains("Examples").trigger("mouseover").click();
    cy.location("pathname").should("equal", "/examples");
    cy.get("a").contains("Component").trigger("mouseover").click();
    cy.location("pathname").should("equal", "/component");
    cy.get("a").contains("Best Practices").trigger("mouseover").click();
    cy.location("pathname").should("equal", "/best-practices");
  });

  it("intercepts", () => {
    cy.intercept("POST", "https://cypress-course.vercel.app/examples", {
      fixture: "example.json",
    });
    cy.get("button").contains("Post Data").click();
  });

  it.only("grudges", () => {
    cy.contains("Add Some Grudges");
    cy.get("button").contains("Clear").should("not.exist");
    cy.get("main ul").within(() => {
      cy.get("li").should("have.length", 0);
    });
    cy.get("input").type("first grudge");
    cy.get("button").contains("Add Grudge").click();
    cy.get("main ul").within(() => {
      cy.get("li").should("have.length", 1);
    });
    cy.get("input").type("second grudge");
    cy.get("button").contains("Add Grudge").click();
    cy.get("main ul").within(() => {
      cy.get("li").should("have.length", 2);
    });
    cy.get("input").type("third grudge");
    cy.get("button").contains("Add Grudge").click();
    cy.get("main ul").within(() => {
      cy.get("li").should("have.length", 3);
      cy.get("li").its(2).should("contains.text", "third grudge");
      cy.get("li")
        .its(1)
        .within(() => {
          cy.get("button").click();
        });
      cy.get("li").should("have.length", 2);
    });
    cy.get("button").contains("Clear").should("exist");
    cy.get("button").contains("Clear").click();
    cy.get("main ul").within(() => {
      cy.get("li").should("have.length", 0);
    });
    cy.get("button").contains("Clear").should("not.exist");
  });
});
