# Assertions against an Array

## Introduction

Let's start by getting an array of users from a JSON response and make some assertions against it.

Let's say the body looks like this:

```json
{
  "data": {
    "users": [
      {
        "id": 123,
        "firstName": "Jason",
        "age": 41
      }
      // ... more users objects ...
    ]
  }
}
```

We can query for an array of user objets:

```typescript
const users = context.find("data.users[*]");
```

Make sure it's an array:

```typescript
users.must.be.an.array();
```

## Must Have Length

Let's say we queried for the first 50 users, so we'd expect the size of the array to match that.

```typescript
users.must.have.length.equal(50);
```

If we were on the last page of results, that might fail. So let's assertion no more than 50.

```typescript
users.must.have.length.be.lessThanOrEquals(50);
```

We can the inverse if we prefer with the `not` statement.

```typescript
users.must.have.length.not.be.greaterThan(50);
```

## Must All

We expect that all items in teh array are objects.

```typescript
users.must.all.be.an.object();
users.must.all.have.properties(["id", "firstName", "age"]);
```

See the power of `all`? Instead of looping through all of the elements and making individual assertions against each, we were able to make a single assertion against every array item!

We can query individual columns within that array to assert against those as well.

```typescript
const ids = context.find("data.users[*].id");
ids.must.all.be.an.integer();
ids.must.all.be.greaterThan(0);
```

We can also do things with negative assertions, using `all...not`

```typescript
ids.must.all.not.be.greaterThan(999999);
```

## Must Have Some / Must Have Any

Sometimes you may expect **some** of them to be something, but not necessarily **all** of them. We got you!

```typescript
ids.must.have.some.be.an.evenInteger();
```

The `some` and `any` statements do the same thing. Use the one that is grammatically better.

```typescript
ids.must.not.have.any.be.nan();
```

## Must Have Only

If we want to be specific about how many will meet a certain criteria, use `only`.

Let's switch it up now and select names.

```typescript
const names = context.find("data.users[*].firstName");
```

Now let's say there can only be one **Jason**!

```typescript
names.must.have.only(1).equal("Jason");
```

You can use any positive number as the argument.

```typescript
names.must.have.only(50).be.alphanumeric();
```

## Must Have At Least

```typescript
ids.must.have.atLeast(15).be.an.evenInteger();
```

## Must Have At Most

```typescript
names.must.have.atMost(10).be.uppercase();
```
