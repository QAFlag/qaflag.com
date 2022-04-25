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
          id: "getting-started/first-steps",
          label: "First Steps",
        },
        {
          type: "doc",
          id: "getting-started/json",
          label: "Setting up JSON",
        },
      ],
    },
  ],
};

module.exports = sidebars;
