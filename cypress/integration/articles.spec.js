describe("Navigate to page article", () => {
  it("should allow page navigation", () => {
    cy.visit("http://localhost:3000");

    cy.get('[role="article"]').last().click();
    cy.get("p").should("have.class", "publishDate");
  });
});
