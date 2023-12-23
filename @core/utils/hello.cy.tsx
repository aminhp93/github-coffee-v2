import { hello } from "./hello";
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress Component Test
describe("<AboutComponent />", () => {
  it("should render and display expected content", () => {
    // Mount the React component for the About page
    // expect(hello()).to.eq("Hello World!saaf");
    const result = hello();

    cy.wrap(result).should("eq", "Hello World!");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
