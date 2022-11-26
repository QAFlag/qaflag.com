# Querying with Find

The `find` method of`PlaywrightContext` is your primary vechicle for querying elements within a page. As its base, it uses Playwright's built-in [page.locator](https://playwright.dev/docs/api/class-page#page-locator). This provides a very powerful way to query for an element on the page with various types of [selectors](https://playwright.dev/docs/selectors).

Here is a basic example, using a CSS selector to pick a text box named password:

```typescript
const passwordInput = context.find('input[name="password"]');
```

Supported selectors include:

- [Simple Text](https://playwright.dev/docs/selectors#text-selector) - `context.find('"Hello World"')`
- [CSS](https://playwright.dev/docs/selectors#css-selector) - `context.find('h1.main')`
- [XPath](https://playwright.dev/docs/selectors#xpath-selectors) - `context.find('xpath=//button')`
- [React](https://playwright.dev/docs/selectors#react-selectors)
- [Vue](https://playwright.dev/docs/selectors#vue-selectors)

You do not need to `await` the `find` method, and you can create the selector before the element is present on the page. It returns a `PlaywrightValue` object, which contains an internal reference to the selector. This can be used later to do something with that element (like click it), query against for children, or make assertions about it.

Examples:

```typescript
const searchInput = context.find('input[name="search_term"]');
const submitButton = context.find('button[type="submit"]');
const listItem = context.find("ui li");
```

You can also chain additional arguments within a `find` query, which are considered sub-queries. For example:

```typescript
const checkedInputs = context.find("input", ":checked");
```

This isn't actually different than simply using it as a single CSS selector like this:

```typescript
const checkedInputs = context.find("input:checked");
```

However, the power of this chaining will become evident as you read further sections of this documentation.

## Naming the Element

The `PlaywrightValue` returned by `find` not only contains the internal selector, but also has a name that will be used in any assertions against it. QA Flag will do its best to automatically give it a decent name. However, sometimes you may want to explicitly assign it a human-readable name so your logs make more sense.

For this we'll use the `as` method:

```typescript
const logo = context.find("img.logo").as("Site Logo");
const submitButton = context.find('button[type="submit"]').as("Search Button");
```

## Matching multiple elements

It's important to note that the selector you pass to `find` may returned multiple matches. So think of it like an array of matches. When you take an action or make an assertion it will do it against the first match... unless you specifically tell it otherwise.

Let's talk about ways to do that. We'll use this example:

```typescript
// This may return multiple values that matched the <li> tag
const listItems = context.find("li");
// The click will happen against the first match
await listItems.mouse.click();
```

### Getting the first, last, or nth item

Maybe you want to select only one of the items. Easy!

```typescript
const firstItem = listItems.first;
const lastItem = listItems.last;
const fifthItem = listItems.nth(4); // Zero-based
```

This does not need to be awaited because it is just returning another locator. You don't necessarily need to save them to their own `const`. You can simply assert against them directly like this.

```typescript
await context.find("li").first.must.be.visible();
```

Or perform an action against the last one.

```typescript
await context.find("li").last.mouse.click();
```

### Count the matches

If you want to know how many matched, use `count()` to give you a new `NumericValue` with that result. This must be awaited since we must go to the browser to look it up.

```typescript
const itemCount = await listItems.count();
```

So we can assert against the result.

```typescript
itemCount.must.be.greaterThan(0);
```

Notice that I didn't have to `await` this assertion. The `count()` method returned a `NumericValue` and not a `PlaywrightValue`. We only need to await things that have to go to the browser do to work. Since we already `awaited` the count on the previous example, now we're just asserting against that number.
