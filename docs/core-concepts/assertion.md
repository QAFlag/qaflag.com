# Assertions

Assertions are made declaratively. You build out a human-readable test and that becomes your assertion. There are many different ways to run the same test. You are literally building the output message as you make a decision to use "must be a string" versus "must be string" or to use "a" or "an". It doesn't effect the outcome; however, QA Flag also does its best with intellisense to present you only the options that make sense given the value you're testing and to encourage good grammar. So you won't even be able to make a statement like "must greater than 0" you'll need to put in the "must **be** greater than 0".

Generally each statement will be a certain value, followed by `must`, `should` or `could`. There are a few exceptions to this grammatical structure, which are just for the benefit of shorthand. But we'll get into exceptions in later documentation.

The normal structure is like the following sentence, where we select an element and then make an `must` statement about it.

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

## Three Varieties of Assertion

No matter type of assertion you use, the rest of the test (after the keyword) will be the same. The three varieties are:

- `must` = Mandatory test whose failure results in the scenario failing.
- `should` = Optional test whose failure results in a warning in the output, but it will not fail the scenario. It's a soft failure.
- `could` = This test is evaluated, but its output is not logged in the results. What is it good for then? keep reading.

### When to use "must"

You'll use `must` the vast majority of the time. This is your traditional assertion, whose failure will cause the entire scenario to fail.

```typescript
const id = context.find("id");
id.must.be.a.positiveInteger();
```

### When to use "should"

Think about `should` as a soft failure. If its condition fails, it will not cause a broader failure on the entire scenario. However, it will log the failure in the scenario's output so that you're aware of it. Consider it a warning, rather than an error.

For example, maybe we expect that the request will take less than 300ms to complete. However, we don't want to freak out of it takes a little longer.

```typescript
context.requestDuration.should.be.lessThan(300);
context.requestDuration.must.be.lessThan(500);
```

If the request took 312 milliseconds, we'd give a soft warning. But if it hit 500+ms then it would be a hard fail.

### When to use "could"

Let's say you have a value that could either be an email address or null. You don't want to use a `must` assertion because if it's null then it will fail. So instead we'd use a `could` test with an if statement like this.

```typescript
const email = context.find("data.email");
if (email.could.be.a.string().passes) {
  email.must.be.an.email();
}
```

In the above example, it's not a failure (or even a warning) if "email" is not a string. A `null` condition might be perfectly acceptable too. So the `could` statement will not log out any message with its result. We can just use the test to fork the code to do other things. So **if** it's a string, then we want to make sure it's an email address. If not, we'll just move on.

QA Flag does its best to be type specific, so that if we know the value you're testing against is a number you'll have different options then if it's string. This contextual awareness makes the intellisense and assertion statement building really intuitive and keeps you from doing things that don't make sense.
