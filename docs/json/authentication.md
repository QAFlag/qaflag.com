# Authenticating Requests

## Basic Auth

```typescript
import { Scenario, Suite } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";

export class UsersSuite extends Suite({
  title: "Test Authentication,
  type: JsonScenario,
}) {
  @Scenario({
    uri: "POST https://reqres.in/api/login",
    auth: {
      username: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  })
  async loginWithBasicAuth(context: JsonContext) {}
}
```

## Bearer Token

```typescript
import { Scenario, Suite } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export class UsersSuite extends Suite({
  title: "Test Authentication,
  type: JsonScenario,
}) {
  @Scenario({
    uri: "POST https://reqres.in/api/login",
    bearerToken: JWT
  })
  async loginWithBasicAuth(context: JsonContext) {}
}
```

# Using a Persona with Bearer Token

Personas allow you to define different types of users that have different properties or (commonly) permission levels. With QA Flag they also allow you to authenticate once and then re-use them seamlessly across many suites and scenarios.

Here is an example of a Persona that will authenticate and then set the bearer token.

```typescript
import {
  Persona,
  Windows,
  Laptop,
  Chrome,
  Before,
  HttpResponse,
} from "@qaflag/core";

export class StandardUserPersona extends Persona("Standard User") {
  @Before({
    uri: "POST /auth",
    data: {
      email: "some.user@your-domain.com,
      password: "some-password",
    },
  })
  authenticate(response: HttpResponse) {
    this.bearerToken = response.data.token;
  }
}
```

In the above example, we use the `@Before` decorator to define what the persona should do. Using this will cause a request to be made to `POST /auth` before any scenarios that use it are executed. We then can grab the response and set the appropriate value.

In this example the response might look something like:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

So we are grabbing that token value out of it and setting it on the `bearerToken` property of the Persona. Any Scenario that uses this persona will use that bearer token by default.

So here's how we'd use it in the scenario, assuming we saved the file at `standard.persona.ts`:

```typescript
import { Scenario, Suite } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";
import { StandardUserPersona } from "./standard.persona";

export class ProductsSuite extends Suite({
  title: "Products",
  type: JsonScenario,
}) {
  @Scenario({
    uri: "GET /products",
    statusCode: 200,
    persona: new StandardUserPersona(),
  })
  async getListOfProducts(context: JsonContext) {}
}
```
