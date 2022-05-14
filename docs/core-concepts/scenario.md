# Scenario

A [suite](/docs/core-concepts/suite) doesn't do any good without scenarios. A scenario is simply a method within the suite that is marked with the `@Scenario` decorator. You should group similar tests into scenarios that represent one user story or test path.

The only required field for the `@Scenario()` arguments is the `uri` property. It must be in the form of `{method} {path}`, where `method` is a valid HTTP verb and path is either an absolute URL or a relative path. The `path` will be evaluated based on the `baseUrl`, which could be defined in the scenario argumnets, suite arguments, `QAFLAG_BASE_URL` environment variable, or QA Flag project argumnets.

```typescript
   @Scenario({
    uri: "GET /users",
  })
  foo() {}
```

This method alone, with no actual content is a valid scenario. It will load the specified URI and checks for a default HTTP Status Code of 200. If you expect a diferent status code, change this value like:

```typescript
   @Scenario({
    uri: "GET /users",
    statusCode: 201
  })
  foo() {}
```

## Assigning Scenario to a Step

If your suite has multiple scenarios, very often thre will be some dependencies between them. For example, first you might want to create a new user, and after that you will want to verify that you can fetch that user. We control this order of execution and dependencies by assigning scenarios to a step.

By default all scenarios execute together in step 1, but you can assign a method to a different step within the `@Scenario` decorator.

```typescript
   @Scenario({
    uri: "POST /users",
    statusCode: 201,
    step: 1
  })
  createUser(context: JsonContext) {
    this.set('userId', context.find('id').$);
  }

  @Scenario({
    uri: "GET /users/{userId}",
    statusCode: 200,
    step: 2
  })
  getUser() {}
```

Notice above that not only did we assign `getUser` to step 2, but we also have the `{userId}` parameter in the URL path. This is a very common pattern, where don't know the full path until a previous step completes. So how does it get filled in? With the `set` method!

Because we assigned `getUser` to step 2 it will wait for `createUser` to complete. When QA Flag goes to execute `getUser`, it sees the parameter placeholder and sees if we've set the value yet. We have, so it will automatically replace it before executing.

If you were wondering about the `.$` part, that's just how we grab the inner value from the value wrapper that comes back with a `find` selector.

... more to come ...
