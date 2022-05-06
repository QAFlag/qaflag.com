// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mySidebar: [
    {
      type: "category",
      label: "Introduction",
      items: [
        {
          type: "doc",
          id: "intro",
          label: "About QA Flag",
        },
      ],
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
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
          id: "getting-started/examining-the-code",
          label: "Examining the Code",
        },
      ],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: [
        {
          type: "doc",
          id: "core-concepts/personas",
          label: "Personas",
        },
      ],
    },
  ],
};

module.exports = sidebars;
