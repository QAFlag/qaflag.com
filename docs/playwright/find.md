# Querying with Find

Using the [locator](/docs/playwright/locator) method is perfectly fine, but we can do better. The `find` method is its cousin and performs the same task; however, it wraps additional querying enhancements that can make writing selectors substantially more intuitive and easier to read.

Everything you learned from the [locator](/docs/playwright/locator) section still works here, because both return a `PlaywrightValue`. And you can pass any selector that you'd use with `locator` to `find` as well.

These will yield identical results:

```typescript
const resultsFromLocator = context.locator("table");
const resultsFromFind = context.find("table");
```

And so will these:

```typescript
const resultsFromLocator = context.locator("'Hello World'");
const resultsFromFind = context.find("'Hello World''");
```

But find will let you do things like chain

```typescript
// Don't do this
const resultsFromLocator = context.locator("label >> text='First Name'");
// Do this instead
const resultsFromFind = context.find("label", "'First Name''");
```

Besides justing being a little bit shorter, the above example also provides much better auto-naming of the selected elements. The first one will have its name be the same as the selector. The second one will be named more human-readable as `Label with "First Name"`.

You can chain as many additional sub-selectors on to the end as you want, but the real power comes in by adding some of QA Flag's helper methods along with it. For example:

```typescript
const firstNameInput = context.find(textbox, below("'First Name'"));
```

"What kind of wizardry is this??", you ask. To use the above we'll simply `import` the `below` and `textbox` helpers from `@qaflag/playwright` like you would any other import. Your IDE should auto-complete this for you to add the imports, but the top of your file will say something like:

```typescript
import {
  PlaywrightContext,
  PlaywrightScenario,
  textbox,
  below,
} from "@qaflag/playwright";
```

The goal should not be to teach our Automation Engineers to be able to write complicated Playwright selectors with Xpath or CSS. The goal, instead, should be able to describe what we are looking for as close to how a human would look at the page as possible.

## Querying for text

One of the most powerful things (and a best practice) is to search for things with certain text in them. This scans the page just like a user would. We can do this a few different ways. All of these are identical:

```typescript
context.find("'Hello World'");
context.find('"Hello World"');
context.find(`"Hello World"`);
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

## Type of element

We want to break the habit of having to use specific HTML tags or selectors to query for a specific element. Instead, we want to describe how the element appears to a user. QA Flag has many common keywords so that you can select elements by the type of control or area of the page.

You can do this one of two ways:

```typescript
context.find(textbox);
context.find("=textbox");
```

The benefit to the first one is it's more concise and easier on the eyes. The downside is that `textbox` needs to be `import`ed at the top of your test suite. This may not be a big deal, but it may potentially annoy you if you have a dozen or more of them. So it's up to you!

In future examples, we'll use the `context.find(textbox);` example only. Just know you can do either.

In order for this type of element selection to work, you should focus on creating semantic code. Use the proper HTML tags for the proper things such as sections on your site or interaction elements. If you create custom controls that don't use the semantic tags, you can use `role` attributes. These are best practices anyway for creating an accessible web application. So do it!

QA Flag does make some additional efforts to grab these elements based on common CSS frameworks and other practices of how you might name elements, attributes, or classes. However, for best results: stick with the standards of semantic web and accessibility!

Here are the available keywords:

- banner = Top section of the site with the logo and masthead or `role="banner"`
- strong = Large text such as headings, bold, strong, or `role="strong"`
- button = Elements resembling a button like `<button>`, `<input type="submit">`, `role="button"` or `class="btn"`
- checkbox = Checkbox elements like `<input type="checkbox">` or `role="checkbox"`
- dialog = Modals and dialog boxes, including native ones and those of popular frameworks, `<modal>` or `role="dialog"`
- dropdown = Dropdown components like the native `<select>` or `role="dropdown"`
- heading = A text heading like `<h1>`, `<h2>`, etc. or `role="heading"`
- image = Any image type item including `<img>`, `<picture>`, `<svg>`, or `role="img"`. This will not grab things with a CSS background image.
- link = Any type of link with `<a>` and a href attribute, `role="link"`
- main = Main section of the site. Includes `<main>` and `role="main"`
- nav = Main navigation of the site. Includes `<nav>` and `role="navigation"`
- radio = Radio buttons with `<input type="radio">` or `role="radio"`
- textbox = Any `<input>` that allows you to type (text, search, tel, url, etc) in it or a `<textarea>`, `role="textbox"`
- fileInput - `<input type="file">`
- dateInput - `<input type="date">` and similar date or time selectors
- colorInput - `<input type="color">`
- region - `<section>`, `role="region"`
- form - `<form>`, `role="form"`
- listItem - `<li>`, `role="listitem"`
- table - `<table>`, `role="table"`
- row - `<tr>`, `role="row"`
- cell - `<td>`, `role="cell"`

Examples:

```typescript
context.find(textbox, under("'First Name'"));
context.find("a", within(nav));
context.find(image, within(header));
context.find(main);
```

## Proximity Filters

Encourage selectors that "think like a human." Users do not think in terms of elements and classes. They look for certain visual cues and locations within the page. If they're filling out a form they're looking for the textbox by the "First Name" label to start typing. These proximity filters help you do that.

### Close by

#### near(selector, distance?)

Identify an element by what it is close to with `near`.

```typescript
context.find("input", near("'First Name'"));
```

Optionally, with near, you can specify a max distance that determines "how near is near"? This second argument is in pixels.

```typescript
context.find("input", near("'First Name'"), 10);
```

### Directional

Sometimes `near` can yield undesirable results because it will pick up something else adjacent and not the element you intend to select. So it helps to be able to pick something within a certain direction.

These directional helpers will grab all matching elements in that direction, without any limtiation of how close. That may be something we can add in the future, but for now it's not a thing. Fortunately, it will sort the closest items first. Typically this will give you the element you're after or else you need to tighten it with additional filters.

#### above(selector)

```typescript
context.find(image, above("'My Picture Caption"));
```

#### below(selector)

```typescript
context.find(textbox, below("'Email Address'"));
```

#### leftOf(selector)

```typescript
context.find(image, leftOf("a.logo"));
```

#### rightOf(selector)

```typescript
context.find(link, leftOf("article"));
```

### Location on the Page

Pair these with a proximity helper to determine where on the page to look for the element.

- top
- bottom
- left
- right
- topLeft
- topRight
- bottomLeft
- bottomRight

For example:

```typescript
context.find(image, near(topLeft));
```

Optionally, with `near`, we can specify how far away it's allowed to be (in pixels). The default is 50.

```typescript
context.find(image, near(topLeft, 120));
```

## ARIA Roles and Labels

### Find by ARIA Role

Search for an element just by role:

```typescript
const main = context.find(role("main"));
```

Search by role and associated label, whether that label uses a `<label>` tag, an `aria-label` attribute, or an `aria-labeledby` attribute. This also respects the `for` attribute on a label tag.

You can do this with a search for the label associated with this textbox. The search is case insensitive, searches for partial matches within, and trims leading or trailing whitespace.

```typescript
const input = context.find(role("textbox", "First Name"));
```

If you want to do an exact search, put quotes in those quotes! This will require a case sensitive, exact match of the label. However, it will still strip any whitespace around it.

```typescript
const input = context.find(role("textbox", "'First Name'"));
```

For fuzzier search using regular expressions:

```typescript
const input = context.find(role("textbox", /(First|Last) Name/i));
```

### Find by Label

You can skip the role part and search for label. It will respect the `<label>` tag, an `aria-label` attribute, or an `aria-labeledby` attribute. This also respects the `for` attribute on a label tag. The search is case insensitive, searches for partial matches within, and trims leading or trailing whitespace.

```typescript
const firstName = await context.find(label("First Name"));
```

If you want a more exact search (case sensitive) but still trimming whitespace, surround it by quotes:

```typescript
const firstName = await context.find(label("'First Name'"));
```

## State of an element

- disabled
- enabled
- hidden
- visible

Examples:

```typescript
context.find(dropdown, disabled);
```

## Relationship to other selectors

### within(selector)

It may be useful to constrain your search to a certain section of the page. Maybe you it's within a certain element:

```typescript
context.find("tr.selected", within("table.results"));
```

You can also use some of the QA Flag sugar to try to automatically identify a certain part of the page, like the navigation bar.

```typescript
context.find(link, ".selected", within(nav));
```

### parent(selector)

The parent filter is similar to `within`, except that it must be a parent-child relationship.

```typescript
context.find("div", parent("section"));
```

This is the same as the CSS selector:

```typescript
context.find("section > parent");
```

### sibling(selector)

Sometimes you might want to select an element based on a sibling.

```typescript
// Select a <header> element that has a sibling <ul>
context.find("header", sibling("ul"));
```

This is the same as the CSS selector:

```typescript
context.find("ul ~ header");
```

### previousSibling(selector)

At times you want to contraint that search only to the sibling immediately before it.

```typescript
// Select a <ul> that comes immediately after a <header>
context.find("ul", previousSibling("header"));
```

This is the same as the CSS selector:

```typescript
context.find("header + ul");
```

## Position in matched results

We can always filter within our results using result of the search itself:

```typescript
const firstImage = context.find("img").first;
const lastImage = context.find("img").last;
const secondImage = context.find("img").nth(2);
```

But, if you prefer, you can also do it inline with the selector like this:

```typescript
const firstImage = context.find("img", first);
const lastImage = context.find("img", last);
const secondImage = context.find("img", nth(2));
```

# Other filters

- and(selector)
- empty
- firstChild
- has(selector)
- lastChild
- not(selector)
- only
