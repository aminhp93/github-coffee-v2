import TreeTemplate from "../TreeTemplate";

// Cypress Component Test
describe("<TreeComponent />", () => {
  it("should render and display expected content", () => {
    // Mount the React component

    // @ts-expect-error TODO: fix this
    cy.mount(<TreeTemplate />);

    // Should contain paragraph with text Folder 1
    cy.get("p").contains("Folder 1");

    // Should not contain paragraph with text Folder not found
    cy.get("p").should("not.contain", "Folder not found");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
