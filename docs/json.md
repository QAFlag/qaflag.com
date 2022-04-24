---
id: getting-started-with-json
title: JSON
---

# Getting Started with JSON Testing

Install the JSON library with this command:

```
npm i --save-dev @qaflag/json
```

Anywhere within your project source, create a file in the pattern `*.suite.ts`.

Sample contents:

```
import { Scenario, Suite } from '@qaflag/core';
import { JsonContext, JsonScenario } from '@qaflag/json';

export class UsersSuite extends Suite({
  type: JsonScenario,
  title: 'Test Users Endpoints',
}) {
  @Scenario({
    uri: 'GET https://jsonplaceholder.typicode.com/users',
    step: 1,
    statusCode: 200,
    schema: '@getUsers',
  })
  async getListOfUsers(context: JsonContext) {
    const ids = context.find('[*].id');
    ids.array.length.must.be.greaterThan(0);
    ids.must.all.be.greaterThan(0);
    this.set('userId', ids.first.$);
  }

  @Scenario({
    description: 'Get one user',
    uri: 'GET https://jsonplaceholder.typicode.com/users/{userId}',
    step: 2,
  })
  async getOneUser(context: JsonContext) {
    context.find('email').must.be.an.email();
    context.find('email').must.be.a.string();
  }
}
```

Now build your test suites with the command:

```
qaflag build
```

And then run your tests

```
qaflag run
```
