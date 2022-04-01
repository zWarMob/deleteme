// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Encryptonize DB",
  tagline: "Secure management of sensitive data across cloud environments",
  url: "http://localhost:3000/",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/rook-favicon-3.ico",
  organizationName: "cyber-crypt-com", // Usually your GitHub org/user name.
  projectName: "encryptonize-core", // Usually your repo name.
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Encryptonize Db",
        logo: {
          alt: "♖",
          src: "img/rook-favicon-3.png",
          srcDark: "img/rook-favicon-3-white.png",
        },
        items: [
          {
            type: "doc",
            docId: "API/Overview",
            position: "left",
            label: "Introduction",
          },
          {
            type: "doc",
            docId: "manuals/user_manual",
            position: "left",
            label: "Getting Started",
          },
          {
            type: "doc",
            docId: "tutorial-basics/create-a-page",
            position: "left",
            label: "Code Samples",
          },
          {
            type: "doc",
            docId: "API/Functions",
            position: "left",
            label: "API reference",
          },
          // {
          //   type: 'docsVersionDropdown',
          //   position: 'left',
          //   dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          //   dropdownActiveClassDisabled: true,
          // },
          {
            href: "https://github.com/cyber-crypt-com/encryptonize-core",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
