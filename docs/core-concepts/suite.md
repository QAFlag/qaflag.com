# Suite

A suite is the basic building block that you will use to create your QA Flag automation. You choose how to group similar groups of tests together. There is no one right or wrong way to do this; it all depends on what makes sense for your application. You may also mix and match these approaches. Common ways to group tests into suites include:

- A suite for each endpoint or section of your site
- Suites for certain actions like logging in or searching
- Grouping different depths or phases of testing, like having a suite called Smoke where you do a series of high-level sanity checks on your application.
- Suites by different user stories around a certain use case

Type simplest suite we could define might look like this:

```typescript
import { Suite } from "@qaflag/core";

export class MyFirstSuite extends Suite({
  title: "My First Test Suite",
}) {}
```

We define the suite with a relavant class name and give it a title. However, this by itself will not accomplish anything meaningful. A suite isn't worth anything until it contains one or more scenarios.

There is a separate section on [scenarios](/docs/core-concepts/scenario), so jump to that when you're ready.

## Properties

### title

`title` is the only required property. The rest of these are optional:

### type

The most common property you'll want to set for your suite (besides title) is `type`. It will almost certainly make your life easier to do this for each suite.

Typically all (or at least most) of the scenarios within the same suite will be the same type. By type, we mean JSON or XML or Playwright or whatever other variety of test you're running. This will be a separate QA Flag library that you add to your project.

For example, if you're mainly doing JSON scenarios, you'd define your suite like this:

```typescript
import { Suite } from "@qaflag/core";
import { JsonScenario } from "@qaflag/json";

export class MyFirstSuite extends Suite({
  title: "My First Test Suite",
  type: JsonScenario,
}) {}
```

All of the scenarios within your suite will inherit this type by default, so then you don't need to define it on each scenario. If you do not define the scenario type in either the suite level or the scenario level, the scenario will fail to execute.

### baseUrl

Define the default base that all the URIs in your suite's scenarios will be based off of. Most often, you don't need to specify this for the suite. There is a default Base URL that you set on the project level (in `qaflag.json`) and you can also set it as an environment variable as `QAFLAG_BASE_URL`. However, if you need to override those defaults for this suite, that's what this is for!

```typescript
import { Suite } from "@qaflag/core";

export class MyFirstSuite extends Suite({
  title: "My First Test Suite",
  baseUrl: "https://localhost:6000/",
}) {}
```

### persona

You may want to have all of the scenarios in your suite execute as a certain Persona. Or, at least, perhaps you want to have one as the default. You can always override it on the scenario level.

We'd define it something like this:

```typescript
import { Suite } from "@qaflag/core";
import { GuestUser } from "./personas/guest.persona";

export class MyFirstSuite extends Suite({
  title: "My First Test Suite",
  persona: new GuestUser(),
}) {}
```

Alternately, you may want to instantiate the persona outside of that constructor so it's easy to reference within your scenarios.

```typescript
import { Suite } from "@qaflag/core";
import { GuestUser } from "./personas/guest.persona";

const guestUser = new GuestUser();

export class MyFirstSuite extends Suite({
  title: "My First Test Suite",
  persona: guestUser,
}) {}
```

## Methods

### get(key: string)

Get a value that you've previously `set` for this suite.

### set(key: string, value: any)

Set value on the suite level. This can later be recalled with the `get` method, but also the values place into set will automatically be used to replace any placeholder arguments in the scenario's URI.

```typescript
this.set("someKey", "someValue");
```

The value can be any data type, it does not have to be a string (although it usually is).

## Decorators

### Before

If there is some code that we want to execute before we start on any scenarios, we can define this as a method on our suite, with the `@Before` decorator. You can name the method itself anything you like. You can even define multiple befores if you like.

```typescript
@Before()
beforeAll() {
  console.log('Before executing any scenarios.');
}
```

While we are calling this method `beforeAll`, you can name it anything that is appropriate for what it does. The decorator is what determines that it runs first, not the name of the method.

If you want to make an HTTP request at this point you can use the argument to `@Before` to define your request parameters, and then the argument to the method will receive the response.

```typescript
import { Before, HttpResponse, Suite } from "@qaflag/core";
import { JsonScenario } from "@qaflag/json";

export class MyFirstSuite extends Suite({
  title: "My First Test Suite",
  type: JsonScenario,
}) {
  @Before({
    uri: "GET https://some-domain/some-endpoint",
  })
  async beforeAll(response: HttpResponse) {
    this.set("userId", response.data.userId);
  }
}
```

### After

If you want to execute certain code after the suite has finished running the last scenario, you can use the `@After` decorator. It works basically like `@Before` (only it runs after, of course) so check out the documentation of that for more.

```typescript
import { After, Suite } from "@qaflag/core";
import { JsonScenario } from "@qaflag/json";

export class MyFirstSuite extends Suite({
  title: "My First Test Suite",
  type: JsonScenario,
}) {
  @After()
  afterAll() {
    console.log("call this after we are done");
  }
}
```
