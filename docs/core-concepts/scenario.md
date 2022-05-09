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

... more to come ...
