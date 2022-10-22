# Using Find with JSON

The first thing you'll want to do with a JSON test is query for content within the response body and make assertions against it. For this we'll use the `find` method. For example, let's say we have a response body like this:

```json
{
  "data": [
    {
      "id": 1,
      "name": "University of Central Florida"
    },
    {
      "id": 2,
      "name": "Florida Southern College"
    }
  ]
}
```

For our scenario's method may look something like this:

```typescript
async listSchools(context: JsonContext) {
    context.find("data").must.be.an.array();
}
```

When we use the `find` method on the top-level `context` argument, we're querying for content against the entire document. This is obvious, we're simply grabbing the data element. But what if we want to make an assertion against a specific array item? We can grab it with `[n]` where `n` is a zero-based index of the array. So let's assert against the `id` property of the first element.

```typescript
async listSchools(context: JsonContext) {
    context.find("data").must.be.an.array();
    context.find("data[0].id").must.be.an.integer();
}
```

We can also use `*` here to select all elements of the array and then put `all` in our assertion to require it to be true for each element.

```typescript
async listSchools(context: JsonContext) {
    context.find("data").must.be.an.array();
    context.find("data[*].id").must.all.be.an.integer();
}
```

We can also grab the result of `find` and save it as a constant. Then we can either query against it multiple times or even query with `find` on its children.

```typescript
async listSchools(context: JsonContext) {
    const data = context.find("data");
    data.must.be.an.array();
    data.find("[*].id").must.all.be.an.integer();
}
```

The query library that we use here is called [JMESPath](https://jmespath.org/). It is extremely powerful, far beyond these simple examples. See its documentation at <https://jmespath.org/> for more.
