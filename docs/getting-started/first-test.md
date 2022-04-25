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
