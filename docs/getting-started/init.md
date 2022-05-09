# Initialize the Project

Once you have the [CLI installed globally](/docs/getting-started/install), you will want to `cd` into the root directory of your project. This should be the folder where the `package.json` file lives. We need to initialize QA Flag on this project, by using the `init` command.

```bash
qaflag init
```

This command will walk you through a series of questions, which should be fairly self explanatory. However, let's go over each in case there is confusion.

- **Base URL** - This will be used as the final fallback for base for any request paths in your scenarios. It can be overridden on the scenario, suite, or environment level, through the `QAFLAG_BASE_URL` environment variable.
- **Source Folder** - We recommend placing the suites alongside your main project code (with the `*.suite.ts` pattern). The default is `src`, but you can change this if your source files live in another root or if you want your QA Flag suites to have their own source folder.
- **Types of Tests** - QA Flag is flexible and can support a wide variety of test scenarios. Choose only the ones you intend to use in this current project.

It may take a minute or two to complete. This process will install the required dependencies based on your selections.
