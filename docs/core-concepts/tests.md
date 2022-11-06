# Tests and Assertions

Assertions are made declaratively. You build out a human-readable test and that becomes your assertion.

The whole statement (starting with `must`, `should` or `could`) is considered the "test" and the final part of the statement that runs the evaluation is considered the "assertion".

```typescript
const data = context.find("data");
data.must.be.an.array();
```

A lot of the extra grammar is not really necessary, so you could leave off the `an` and it would be the same thing.

```typescript
data.must.be.array();
```

QA Flag encourages good grammar and good messages, and the intellisense helps you along the way to form coherant sentences that become your assertion.

```typescript
data.must.have.length.be.greaterThan(0);
```

You normally start a test by appending `must` on to the end of a value, like what you get as a result of `find`. However, there are three base types of assertions:

- `must` = Mandatory test whose failure results in the scenario failing.
- `should` = Optional test whose failure results in a warning in the output, but it will not fail the scenario. It's a soft failure.
- `could` = This test is evaluated, but its output is not logged in the results. What is it good for then? keep reading.

Let's say you have a value that could either be an email address or null. You don't want to use a `must` assertion because if it's null then it will fail. So instead we'd use a `could` test with an if statement like this.

```typescript
const email = context.find("data.email");
if (email.could.be.a.string().passes) {
  email.must.be.an.email();
}
```

No matter if you use `must`, `should`, or `could` the rest of the test will be the same.

QA Flag does its best to be type specific, so that if we know the value you're testing against is a number you'll have different options then if it's string. This contextual awareness makes the intellisense and assertion statement building really intuitive and keeps you from doing things that don't make sense.
