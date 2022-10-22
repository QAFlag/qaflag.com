# Testing JSON APIs

This is the best place to start your automated journey. Your JSON and RESTful APIs have predictable inputs and outputs and are really easy to to begin automating.

Here is a basic example:

```typescript
import { Scenario, Suite } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";

export class UsersSuite extends Suite({
  title: "Test Users Endpoints",
  type: JsonScenario,
  baseUrl: "https://jsonplaceholder.typicode.com",
}) {
  @Scenario({
    uri: "GET /users",
  })
  async getListOfUsers(context: JsonContext) {
    const users = context.find("[*]");
    users.must.be.an.array();
    users.array.length.must.equal(10);
    users.must.all.have.properties(["id", "name", "username", "email"]);
    users.find("id").must.all.be.a.positiveInteger();
    users.find("email").must.all.be.an.email();
  }
}
```
