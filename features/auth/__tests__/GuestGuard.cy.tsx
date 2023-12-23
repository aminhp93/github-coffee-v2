import GuestGuard from "../GuestGuard";
import MockRouter from "@/cypress/utils/router";

/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress Component Test
describe("<GuestGuard />", () => {
  it("should render and display expected content", () => {
    // Mount the React component for the Index page
    const props = {
      children: <div></div>,
      fallback: null,
    };
    cy.mount(
      <MockRouter>
        <GuestGuard {...props} />
      </MockRouter>
    );
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
