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
          id: "core-concepts/persona",
          label: "Persona",
        },
      ],
    },
    {
      type: "category",
      label: "JSON",
      items: [
        {
          type: "doc",
          id: "json/find",
          label: "Find",
        },
      ],
    },
  ],
};

module.exports = sidebars;
