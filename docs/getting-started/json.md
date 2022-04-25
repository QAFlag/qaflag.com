---
title: JSON
---

# Getting Started with JSON Testing

Anywhere within your project source, create a file in the pattern `*.suite.ts`, such as `example.suite.ts`. Now create the contents of the suite, for example:

```
import { Scenario, Suite } from '@qaflag/core';
import { JsonContext, JsonScenario } from '@qaflag/json';

export class UsersSuite extends Suite({
  type: JsonScenario,
  title: 'Test Users Endpoints',
}) {
  @Scenario({
    uri: 'GET https://jsonplaceholder.typicode.com/users',
    statusCode: 200,
  })
  async getListOfUsers(context: JsonContext) {
    const ids = context.find('[*].id');
    ids.must.be.an.array();
    ids.must.have.length.greaterThan(0);
    ids.must.all.be.greaterThan(0);
  }
}
```

And then run your test:

```
qaflag run --build --all
```
