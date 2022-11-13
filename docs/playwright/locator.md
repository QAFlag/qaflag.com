# Querying with Locator

The `context.locator` method in a `PlaywrightScenario` uses the Playwright's [page.locator](https://playwright.dev/docs/api/class-page#page-locator) under the hood. It provides a very powerful way to query for an element on the page with various types of [selectors](https://playwright.dev/docs/selectors).

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

You do not need to `await` the `locator` method. You can select them before the element is rendered. It will return a `PlaywrightValue` object, which contains a reference to the locator. This can be used later to grab for that element to do something with it (like click it), query against its children, or make assertions about it.

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

## Matching multiple elements

It's important to note that the selector you passed to`locator` may have returned multiple matches. So think of it like an array of matches. When you take an action, query children, or make an assertion it will do it against the first match... unless you specifically tell it otherwise.

Let's talk about ways to do that. We'll use this example:

```typescript
const listItems = context.locator("li");
```

### Count the matches

If you want to know how many matched, use `count()` to give you a new `NumberValue` with that result. This must be awaited since we must go to the browser to look it up.

```typescript
const itemCount = await listItems.count();
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

### Searching for children

You can also select an element with `locator` and then use `locator` on it to query within its children. For example:

```typescript
const form = context.locator("form.search");
const checkboxes = form.locator('input[type="checkbox"]');
```
