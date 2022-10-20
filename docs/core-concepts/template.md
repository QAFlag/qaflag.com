# Templates

Sometimes you have many scenarios that are only slightly different from eacother. Defining them over and over can become verbose and redundant. That's where templates come to the rescue!

By defining a template, you're actually creating a custom decorator. Then you can mark your scenarios with your custom template, rather than the typical `@Scenario` decorator.

For example, let's say you want to pull a list of users. But you also want to test the case where an unauthorized user access it. Let's first define our baseline template:

```typescript
const GetUserList = Template({
  uri: "GET /users",
  statusCode: 200,
  persona: new AdminUser(),
});
```

Then within our UserSuite class, we'll use that template as a decorator three times:

```typescript

@GetUserList({
    description: "Get a user list with an admin user"
})
async getUsers() {}

@GetUserList({
    persona: new StandardUser(),
    statusCode: 403,
    description: "Try to get user list with non-admin user"
})
async getUsersForbidden() {}

@GetUserList({
    persona: new UnauthenticatedUser(),
    statusCode: 401,
    description: "Try to get user list, with no auth token"
})
async getUsersNotAuthenticated() {}


```

As you see above, with templates you only have to set what changes.
