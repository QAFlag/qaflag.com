# Querying with Locator

The `context.locator` method in a `PlaywrightScenario` uses the Playwright's [page.locator](https://playwright.dev/docs/api/class-page#page-locator) directly. It provides a very powerful way to query for an element on the page with various types of [selectors](https://playwright.dev/docs/selectors).

Here is a basic example, using a CSS selector to pick a text box named password:

```typescript
const passwordInput = context.locator('input[name="password"]');
```

Supported selectors include

- [Simple Text](https://playwright.dev/docs/selectors#text-selector) - `context.locator('"Hello World"')`
- [CSS](https://playwright.dev/docs/selectors#css-selector) - `context.locator('h1.main')`
- [XPath](https://playwright.dev/docs/selectors#xpath-selectors) - `context.locator('xpath=//button')`
- [React](https://playwright.dev/docs/selectors#react-selectors)
- [Vue](https://playwright.dev/docs/selectors#vue-selectors)

You do not need to `await` the `locator` method. You can create the locator before the element is present on the page. It will return a `PlaywrightValue` object, which contains a reference to the locator. This can be used later to do something with that element (like click it), query against for children, or make assertions about it.

Example:

```typescript
const searchInput = context.locator('input[name="search_term"]');
const submitButton = context.locator('button[type="submit"]);
await searchInput.must.be.visible();
await searchInput.keyboard.input('My Search Term');
await submitButton.must.be.enabled();
await submitButton.mouse.click();
```

Notice above that we created the locators with `locator`, without awaiting them. But then we used `await` when we made assertions against them or took an action on them. Think about it like any time we go to the browser to ask it to do something, we need to wait for that to happen. But simply creating a pointer toward a certain selector, we aren't asking the browser to do anything.

## Renaming elements with "as"

You build the assertion messages in a declarative way with QA Flag, using human-readable grammar with `must`. However, the elements themselves need a name. If you don't explicitly name them, QA Flag will use its best effor to do so... usually just calling it the selector.

If you want your assertion messages to be easier to read, give them a name with `as` like this:

```typescript
const logo = context.locator("main > h1 img").as("Site Logo");
const submitButton = context
  .locator('button[type="submit"]')
  .as("Search Button");
```

### Searching for descendents

Once you select a `PlaywrightValue`, you can also search within its children. Use `context.locator` and then use `value.locator` on the result to query is under that sub-tree. For example:

```typescript
// Find the search form
const form = context.locator("form.search");
// Now find the checkboxes within that form
const checkboxes = form.locator('input[type="checkbox"]');
```

## Matching multiple elements

It's important to note that the selector you passed to`locator` may have returned multiple matches. So think of it like an array of matches. When you take an action, query children, or make an assertion it will do it against the first match... unless you specifically tell it otherwise.

Let's talk about ways to do that. We'll use this example:

```typescript
// This may return multiple values that matched the <li> tag
const listItems = context.locator("li");
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
await listItems.first.must.be.visible();
```

Or perform an action against the last one.

```typescript
await listItems.last.mouse.click();
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
