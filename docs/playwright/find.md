# Querying with Find

Using the [locator](/docs/playwright/locator) method is perfectly fine, but we can do better. The `find` method is its cousin and performs the same task; however, it wraps additional querying enhancements that can make writing selectors substantially more intuitive and easier to read.

Everything you learned from the [locator](/docs/playwright/locator) section still works here, because both return a `PlaywrightValue`. And you can pass any selector that you'd use with `locator` to `find` as well.

These will yield identical results:

```typescript
const resultsFromLocator = context.locator("table");
const resultsFromFind = context.find("table");
```

Using find will also give you better naming of the element. QA Flag keeps an internal name for each thing that you select. It attempts to build this intelligently. If you just use the Playwright's `locator` method, your element's name will be identical to the selector. However, with `find` we'll have a bit more context to create human-readable names.

With `find` we can also add additional arguments with sub-queries.

```typescript
const element = context.find("ul", "li");
```

This simple example doesn't give you any advantage over this identical selector:

```typescript
const element = context.find("ul li");
```

However, it's important to understand that you can do this. And the power of this chaining will become evident as you continue reading the next sections.
