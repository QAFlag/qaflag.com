// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mySidebar: [
    {
      type: "category",
      label: "Getting Started",
      items: [
        {
          type: "doc",
          id: "getting-started/intro",
          label: "About QA Flag",
        },
        {
          type: "doc",
          id: "getting-started/install",
          label: "Install the CLI",
        },
        {
          type: "doc",
          id: "getting-started/init",
          label: "Initialize the Project",
        },
        {
          type: "doc",
          id: "getting-started/first-test",
          label: "Writing Our First Test",
        },
        {
          type: "doc",
          id: "getting-started/test-structure",
          label: "Test Structure",
        },
      ],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        {
          type: "doc",
          id: "core-concepts/suite",
          label: "Suite",
        },
        {
          type: "doc",
          id: "core-concepts/scenario",
          label: "Scenario",
        },
        {
          type: "doc",
          id: "core-concepts/step",
          label: "Step",
        },
        {
          type: "doc",
          id: "core-concepts/context",
          label: "Context",
        },
        {
          type: "doc",
          id: "core-concepts/assertion",
          label: "Assertion",
        },
        {
          type: "doc",
          id: "core-concepts/persona",
          label: "Persona",
        },
        {
          type: "doc",
          id: "core-concepts/template",
          label: "Template",
        },
      ],
    },
    {
      type: "category",
      label: "CLI",
      items: [
        {
          type: "doc",
          id: "cli/init",
          label: "Initialize Project",
        },
        {
          type: "doc",
          id: "cli/generate-suite",
          label: "Generate New Suite",
        },
        {
          type: "doc",
          id: "cli/generate-persona",
          label: "Generate New Persona",
        },
        {
          type: "doc",
          id: "cli/list",
          label: "List Suites",
        },
        {
          type: "doc",
          id: "cli/plan",
          label: "Show Test Plan",
        },
        {
          type: "doc",
          id: "cli/build",
          label: "Build",
        },
        {
          type: "doc",
          id: "cli/run",
          label: "Run Suites",
        },
      ],
    },
    {
      type: "category",
      label: "JSON",
      items: [
        {
          type: "doc",
          id: "json/json-intro",
          label: "Testing a JSON API",
        },
        {
          type: "doc",
          id: "json/find",
          label: "Find",
        },
        {
          type: "doc",
          id: "json/data-payload",
          label: "Sending a Payload",
        },
        {
          type: "doc",
          id: "json/authentication",
          label: "Authentication",
        },
        {
          type: "doc",
          id: "json/schema",
          label: "Asserting a Schema",
        },
        {
          type: "doc",
          id: "json/array-assertions",
          label: "Array Assertions",
        },
      ],
    },
    {
      type: "category",
      label: "Browser",
      items: [
        {
          type: "doc",
          id: "playwright/playwright-intro",
          label: "Testing with Playwright",
        },
        {
          type: "doc",
          id: "playwright/locator",
          label: "Querying with Locator",
        },
        {
          type: "doc",
          id: "playwright/find",
          label: "Querying with Find",
        },
        {
          type: "doc",
          id: "playwright/visual",
          label: "Visaul Comparison",
        },
      ],
    },
  ],
};

module.exports = sidebars;
