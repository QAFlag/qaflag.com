# Querying by Text Contents

One of the most powerful things (and a best practice) is to search for things with certain text in them. This scans the page just like a user would. We can do this a few different ways. By putting _quotes-inside-the-quotes_, we tell QA Flag to look for the exact string instead of looking for a selector.

```typescript
context.find("'Hello World'");
```

This query will look for an element containing _exactly_ the string "Hello World", with any whitespace trimmed. So that means if your element has `"Hello World!"` in it, then it will not match. If you want a more fuzzy match, which searches for the text anywhere within the element:

```typescript
context.find("*Hello World*");
```

This will do a simple "starts with" query:

```typescript
context.find("^Hello*");
```

This will do an "ends with":

```typescript
context.find("*Hello$");
```

Lastly, you can also use a full-blown regular expression if you're feeling saucy.

```typescript
context.find(/hello world/i);
```

While all of the above are identical, the first one of each group is the recommened best practice.
