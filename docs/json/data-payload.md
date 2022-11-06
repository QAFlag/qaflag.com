# Submitting Data Payloads with JSON Requsts

When you are testing `POST`, `PATCH`, or `PUT` endpoints, you will most likely want to add a payload along with the request. This is extremely simple. Just use the `data` property.

The example below will submit the payload as JSON encoded and autoamtically set the approprate `Content-Type` header as `application/json`

```typescript
import { Scenario, Suite } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";

export class UsersSuite extends Suite({
  title: "Test Users Endpoints",
  type: JsonScenario,
}) {
  @Scenario({
    uri: "POST https://dummyjson.com/products/add",
    data: {
      title: "Avocado Toast",
      price: 10.99,
    },
  })
  async addProduct(context: JsonContext) {}
}
```

If you instead need to submit the data as form-encoded, just use the `Form` wrapper. This will propertly URL Encode the payload and add the `Content-Type` header as `application/x-www-form-urlencoded`.

Behind the scenes `QA Flag` is using the [form-data NPM library](https://www.npmjs.com/package/form-dataaxio).

```typescript
import { Scenario, Suite, Form } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";

export class UsersSuite extends Suite({
  title: "Test Users Endpoints",
  type: JsonScenario,
}) {
  @Scenario({
    uri: "POST https://dummyjson.com/products/add",
    data: Form({
      title: "Avocado Toast",
      price: 10.99,
    }),
  })
  async addProduct(context: JsonContext) {}
}
```

If you need to submit a file upload with the form data, you can do this exactly the same way. Just add a data item that is a `Stream`. This will set all the necessary headers and `Content-Type` to `multipart/form-data`.

```typescript
import { Scenario, Suite, Form } from "@qaflag/core";
import { JsonContext, JsonScenario } from "@qaflag/json";
import * as fs from "fs";

export class UsersSuite extends Suite({
  title: "Test Users Endpoints",
  type: JsonScenario,
}) {
  @Scenario({
    uri: "POST https://dummyjson.com/products/add",
    data: Form({
      title: "Avocado Toast",
      price: 10.99,
      image: fs.createReadStream("./assets/avocado-toast.jpg"),
    }),
  })
  async addProduct(context: JsonContext) {}
}
```
