---
sidebar_position: 2
label: "First Steps"
---

# First Steps

## Installing the CLI

First, you will wnat to install the CLI globally. You only need to do this once on your machine, not once per project. Choose the appropriate command based on your package manager of choice.

```bash
// NPM
npm i -g @qaflag/cli

// Yarn
yarn global add @qaflag/cli

// PNPM
pnpm add -g @qaflag/cli
```

## Initializing the Project

Next, `cd` into the root directory of your project. This should be the folder where the `package.json` file lives. We need to initialize QA Flag on this project, by using the `init` command.

```bash
qaflag init
```

This command will walk you through a series of questions, which should be fairly self explanatory. However, let's go over each in case there is confusion.

- Default Domain: If no domain is specified in your test suite, nor through the `QAFLAG_DEFAULT_DOMAIN` environment variable, this will be used as the base URL for each scenario.
- Source Folder: We recommend placing the test suites alongside your main project code (with the `*.suite.ts` pattern). The default is `src`, but you can change this if your source files live in another root or if you want your QA Flag suites to have their own source folder.
- Types of Tests: QA Flag is flexible and can support a wide variety of test scenarios. Choose only the ones you intend to use in this current project.

The setup may take a minute to complete. Once finished, you should be ready to start creating your first test. The actual content of your test suite will depend on which type of scenario you want to create: JSON, Browser, XML, HTML, etc. We will start with an example of JSON testing. The same basic concepts apply, regardless of which specific type of scenario you will be using.
