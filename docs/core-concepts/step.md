# Steps

If your suite has multiple scenarios, very often thre will be a certain orer you want to execute them in. When you do not explicitly assign a `step` to a scenario, QA Flag will by default be assigned to step 1. It fires of all scenarios in the same step asynchronously (all at once).

Sometimes that's great because it will speed things up tremendously. But before long you'll find there is a certain order you need to execute them in, especially when there are dependencies. For example, first you might want to create a new user, and after that you will want to verify that you can fetch that user. We control this order of execution and dependencies by assigning scenarios to a step.

Example:

```typescript
   @Scenario({
    uri: "GET /foo",
    step: 1
  })
  foo(context: JsonContext) {}

  @Scenario({
    uri: "GET /bar",
    step: 2
  })
  bar() {}
```

The above example gets the point across, but it's not especially useful. Here is a more useful example of creating a user and then fetching it. Notice how we have a parameter in the second scenario. This is `{userId}` is a placeholder that gets replaced when we use the `this.set` method on the first scenario.

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

The `.$` above is probably the only mysterious part. This is a special feature of QA Flag to extract the underlying value. The `context.find` method will return a wrapped `Value` object, but we want to get the actual value it wraps. That's what the `.$` does for you. So, above, we `set` a property called `userId` and then when the second scenario executes it will replace the `{userId}` parameter with this value. Cool, huh?
