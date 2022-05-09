# What is QA Flag?

QA Flag is a test automation framework, written in TypeScript. The primary goals are creating a modern interface that is strictly typed. Once you learn the basics, your IDE's intellisense will do most of the work for you. But we have your back with great documentation and a helpful CLI.

The test suites can live conveniently along side the rest of your application's source files. QA Flag's modular design allows you to use it for a wide variety of web applications:

- **JSON** - REST, GraphQL and other APIs
- **Browser** - End-to-end UX testing with headless or headful browser (Playwright)
- **HTML** - When you don't need a full browser, DOM only tests are super-fast
- **XML** - XML APIs, including SOAP
- **Feeds** - RSS, MRSS or ATOM

# Core Concepts

- **Test** - A single assertion that makes a statement of fact and results in a pass or failure. Typically, this will be a `must` statement in QA Flag, but there is also an optional variety with the `should` syntax.
- **[Scenario](/docs/core-concepts/scenario)** - Group of tests that together cover a single path or user story.
- **[Suite](/docs/core-concepts/suite)** - Collection of related scenarios. They may cover one area of the application, a class of tests (like smoke tests), or a group of similar use cases. Whatever make sense for your project.
- **Steps** - Scenarios within a suite often have dependencies between them, so you want to control the order of exection. You can assign scenarios to a numeric step. Step 1 is always fully completed before moving on to step 2 and so forth.
- **[Persona](/docs/core-concepts/persona)** - This assigns an identiy to hypothetical user executing the scenario. The persona may have attributes defining their unique personality, device they are using, and authentication credentails.
- **Template** - Often you will find yourself creating many similar scenarios with only minor differences. QA Flag allows you to create a template that can be re-used, so that you only have to specify what changes.
- **Context** - Once you write your first suites, you'll see us use `context` a lot. This is the root that you'll build off of in each scenario to find data from the response and make assertions.
