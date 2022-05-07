# Writing Our First Test

We're going to start with by create a JSON test because it's the easiest, but all other types of suites will build up on top of these same concepts.

Anywhere within your project source, create a file in the pattern `*.suite.ts`, such as `example.suite.ts`. Now create the contents of the suite, for example:

```typescript
import { Suite, Scenario } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";

export class UsersSuite extends Suite({
  type: JsonScenario,
  title: "Test Users Endpoints",
}) {
  @Scenario({
    uri: "GET https://jsonplaceholder.typicode.com/users",
    statusCode: 200,
  })
  async getListOfUsers(context: JsonContext) {
    const ids = context.find("[*].id");
    ids.must.be.an.array();
    ids.must.have.length.greaterThan(0);
    ids.must.all.be.greaterThan(0);
  }
}
```

And then run your test:

```bash
qaflag run --build --all
```

The above command will transpile our code from TypeScript into JavaScript, so that it can be executed. Then it will run all of our suites. Since right now we only have one suite, this is all we need.

## Examining the Code

Let's break down what we did in each part of the code. The first part should be pretty self-explanatory, but we need to import the `Suite` and `Scenario` classes from core library. Then we will import the scenario and context classes that we need for our specific type of test, in this case that is JSON.

```typescript
import { Scenario, Suite } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";
```

Next we are defining the suite. You can name the class anything you want, usually you want to call it something descriptive for what you'll be testing and often it will be the same as the file name.

We extend the core `Suite` class, which is actually a function with various optional arguments. `title` is the only required option. We can specify `type`, which will become the default test type for each scenario within this suite. Alternately, you can set it on each scenario or override the default in each scenario.

```typescript
export class UsersSuite extends Suite({
 type: JsonScenario,
 title: "Test Users Endpoints",
}) {
```

Within the class you can have any number of methods you want. Only the ones with the `@Scenario` decorator (or a template decorator, which we'll get into later) will run. You can add other methods as helper methods or whatever you like. There are many properties that this scenario decorator can contain, the only one that is required is `uri`. Typically, the URI format will be HTTP Method, a space, and then the path (which may be relative or absolute).

Below we are using a fully-qualified URL for the `uri` property, but you can do a path only and it will be relative to your the Base URL--which can be set as an environment variable, in your `qaflag.json`, in the suite decorator as `baseUrl` property, or as a separate item in the scenario decorator with the `baseUrl` property.

You will often also want to set a `statusCode`, which will turn into an automatic first assertion of this scenario.

```typescript
   @Scenario({
    uri: "GET https://jsonplaceholder.typicode.com/users",
    statusCode: 200,
  })
```

Finally, we get into our actual scenario and tests. You can make the method anything you want, but it should be descriptive of what this scenario does. Your `context` argument can be named something else if you prefer, but you should specify its type to match your type of test's context class.

The `find` method is always present and allows you to select an element or elements from the response body. The value that comes back from the `find` method will be a wrapped `*Value` element that will retain the context of what you seleted and what type of data it is expected to maintain. The methods and properties you find in intellisense when you chain the `.` after your seleced value will differ depending on what it is.

You will most often make an assertion with the `must` property off of your selected value. Effectively, you create a plain-English assertion message through the chaining. You will find the available properties and methods to be contextual based on what you type and should generally form a logical sentence. We'll get into more details later.

```typescript
  async getListOfUsers(context: JsonContext) {
    const ids = context.find("[*].id");
    ids.must.be.an.array();
    ids.must.have.length.greaterThan(0);
    ids.must.all.be.greaterThan(0);
  }
```

In this scenario, our response came back with an array of user objects, all of whom shoud have an `id` property. Using JSON Schema syntax we `find` all of the id properties from that array of objects. We assert that it is an array, that the length of that array is greater than 0, and that all items in that array of ids are greater than 0.
