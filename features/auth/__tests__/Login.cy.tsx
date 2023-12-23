import Login from "../Login";
import MockRouter from "@/cypress/utils/router";

/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress Component Test
describe("<Login />", () => {
  it("should render and display expected content", () => {
    // Mount the React component for the Login page
    cy.mount(
      <MockRouter>
        <Login />
      </MockRouter>
    );

    // Should contain button
    cy.get("button").contains("Sign In");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
