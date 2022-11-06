# Context

When you create a `Scenario` method you will almost always want to include the `context` argument. This is what is going to allow you to do anything meaningful with the response of that scenario or to make any test assertions. You will type that context argument appropriately based on what type of scenario it is.

```typescript
  @Scenario({
    uri: "GET /users/1",
  })
  getUser(context: JsonContext) {}
```

Above we are doing a JSON scenario (testing a REST API), so we use `JsonContext`. But if we were doing a Playwright browser UX test, we'd use `PlaywrightContext` instead or if we were testing an RSS feed we'd do `RssContext`. You get the idea. This typing is crucial because, simply, we can do differnet things depending on the type of scenario and the content in its response.

## Fatal Error

If you need to interupt a scenario's execution, just use a standard `throw` statement. This will not only stop the current execution but also any further scenarios after the current step.

```typescript
  @Scenario({
    uri: "GET /songs/humpty-dance",
  })
  getUser(context: PlaywrightContext) {
      throw "Already stop what you're doing because i'm about to ruin the image and the style that you're used to.";
  }
```

## Standard Methods and Properties

Since QA Flag supports a wide variety of scenario types, there is virtually nothing in context that universal for all scenario types. So you should consult the documentation for the one you're using (or just use intellisense to explore). However, there are a few standards.

### debug(value)

Sometimes you just need to `console.log` to see what something is, but you don't literally want to use console log. What you really want to do is `context.debug(foo)` so that you can spit something out in the context of that scenario.

This is very useful for writing out a string or seeing what the content of a certain value you fetched is. Example:

```typescript
  @Scenario({
    uri: "GET /users/1",
  })
  getUser(context: JsonContext) {
      context.debug("Got user response");
      const firstName = context.find('data.firstName');
      context.debug(firstName);
  }
```

### document

The `document` property gives you access to the response document. You can make assertions against its content or simply echo part or all of it out. It's commonly coupled with `debug` like this.

```typescript
context.debug(context.document);
```

### fail(value) and pass(value)

Usually you will start a test with a `must` assertion; however, if you want to maually want to test for something, go for it! You can inject a pass or fail into your scenario's log with these methods.

```typescript
  @Scenario({
    uri: "GET /users/1",
  })
  getUser(context: JsonContext) {
    const firstName = context.find('data.firstName');
    if (firstName.$ == 'Jason') {
        context.pass('Noice! They are Jason! :-)');
    } else {
        context.fail('Bogus! They are not Jason. :-(');
    }
  }
```

### group

Sometimes you may want to group several tests together within a scenario. This is really just cosmetic to make the test ouput more readable. We should `await` the group to complete. The inner function may also be `async` in case you need to use a promise in there.

```typescript
  @Scenario({
    uri: "GET /users/1",
  })
  getUser(context: JsonContext) {
      await context.group("Check Name", () => {
        context.find("data.firstName").must.be.a.string();
        context.find("data.lastName").must.be.a.string();
      });
      await context.group("Check Other Values", async () => {
        context.find("data.birthday").must.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
        context.find("data.age").must.be.a.number();
      });
  }
```

### must

Makes an assertion that is required to pass.

```typescript
context.find("data").must.be.an.array();
```

### requestDuration

You may want to make an assertion that the duration of the request was under a certain limit. The value of `requestDuration` will be in milliseconds.

```typescript
context.requestDuration.must.be.lessThan(300);
```

### scenario

The scenario property allows you to grab the underlying scenario.

```typescript
  @Scenario({
    uri: "GET /users/1",
  })
  getUser(context: JsonContext) {
      context.debug(`Scenario is called ${context.scenario.title}`);
  }
```

### should

Makes an assertion that typically should pass. If this assertion fails it WILL NOT cause your overall scenario to fail. However, it will still evaluate it and alert you of the failure on the scenario's output.

This is useful for some of those soft tests that you just want to know about. Or maybe ones that have some flake.

```typescript
context.requestDuration.should.be.lessThan(300);
```
