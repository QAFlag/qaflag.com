# Querying with Find

Using the [locator](/docs/playwright/locator) method is perfectly fine, but we can do better. The `find` method is its cousin and performs the same task; however, it wraps additional querying enhancements that can make writing selectors substantially more intuitive and easier to read.

Everything you learend from the [locator](/docs/playwright/locator) section still works here, because both return a `PlaywrightValue`. And you can pass any selector that you'd use with `locator` to `find` as well.

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
context.find(text("Hello World"));
context.find("text='Hello World'");
context.find(":text-is('Hello World')");
```

All three of those queries will look for an element containing _exactly_ the string "Hello World", with any whitespace trimmed. So that means if your element has `"Hello World!"` in it, then it will not match. If you want a more fuzzy match, any of these will work and are identical:

```typescript
context.find("*Hello World*");
context.find(contains("Hello World"));
context.find("text=Hello World");
context.find(":has-text('Hello World')");
```

Lastly, you can also use a regular expression if you're feeling saucy.

```typescript
context.find(/hello world/i);
context.find(matches("/hello world/i"));
context.find("text=/hello world/i");
context.find(":text-matches('/hello world/', 'i')");
```

While all of the above are identical, the first one of each group is the recommened best practice.

## Proximity Filters

Encourage selectors that "think like a human." Users do not think in terms of elements and classes. They look for certain visual cues and locations within the page. If they're filling out a form they're looking for the textbox by the "First Name" label to start typing. These proximity filters help you do that.

### Close by

#### near(selector, distance?)

...

```typescript
context.find("input", near("'First Name'"));
```

Optionally, with near, you can specify a max distance that determines "how near is near"? This second argument is in pixels.

```typescript
context.find("input", near("'First Name'"), 10);
```

### Directional

#### above(selector)

...

#### below(selector)

..

#### leftOf(selector)

...

#### rightOf(selector)

...

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

## Type of element

We want to break the habit of having to use specific HTML tags or selectors to query for a specific element. Instead, we want to describe how the element appears to a user.

More documentation to come...

- banner
- bold
- button
- checkbox
- dialog
- dropdown
- field
- header
- heading
- image
- link
- main
- nav
- radio
- textbox

Examples:

```typescript
context.find(textbox, under("'First Name'"));
context.find("a", within(nav));
context.find(image, within(header));
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

## Filter by attribute

You can filter your query to elements with a certain attribute in a few ways. You are free to use the traditional CSS selectors, like:

```typescript
context.find('img[src="foobar.png"]');
```

Or even use xpath like:

```typescript
context.find('//img[@src = "foobar.png"]');
```

But with `find` we've added some other shorthand options that you'll likely find preferable.

```typescript
context.find("img@src=foobar.png");
context.find('img@src="foobar.png"');
context.find("img@src==foobar.png");
context.find("img@src=='foobar.png'");
```

All of the above examples are an exact match. In other words, the value of `src` has to be exactly `foobar.png`.

### Without the tag

You can select for an attribute and value pair only, without narrowing it to a tag. All of the examples in this section will work without it.

```typescript
context.find("@title='Some Value'");
```

### Without the value

You can also drop the value part and only look for a tag that has a certain attribute.

```typescript
context.find("input@readonly");
```

### Without the tag or the value

Or you can just search for any element with a certain attribute, regardless of tag or value.

```typescript
context.find("@contenteditable");
```

### Attribute Value Contains (\*=)

Attribute value contains this text. These are all equivalent.

```typescript
context.find("img@src=*foobar*");
context.find("img@src*=foobar");
context.find("img@src*='foobar'");
```

You see with the first example, you can use a standard `=` single equality and then surround your string with `*` wildcards. Or you can use the '\*=` equality, followed by your value. The value can be quoted but doesn't need to be. The behavior does not change.

### Attribute Value Starts With (^=)

Attribute value starts with this text. These are all equivalent.

```typescript
context.find("img@src^=foobar");
```

### Attribute Value Ends With ($=)

Attribute value ends with this text. These are all equivalent.

```typescript
context.find("img@src$=foobar");
context.find("img@src$='foobar'");
```

### Attribute Value Contains Word (~=)

This one looks for a word (spaces around it) that matches the value. These are all equivalent.

```typescript
context.find("input@placeholder~=foobar");
context.find("input@placeholder~='foobar'");
```

### The |= selector

This one is a little different. It looks for a word (spaces around it) that matches the value. These are all equivalent.

```typescript
context.find("input@placeholder~=foobar");
context.find("input@placeholder~='foobar'");
```

### Attribute Helpers

You can use the selector string to find attributes, but we've also added a few helper methods if you prefer.

- alt(value)
- ariaLabel(value)
- href(value)
- id(elementId)
- placeholder(value)
- role(roleName)
- src(value)
- title(value)

Examples:

```typescript
context.find(image, alt("Some text"));
context.find(title("some title"));
context.find(role("button"));
```

There is generally no reason to use this other than the string selector, unless you think it reads better. However, the `role` method does constrain the possible role values to only legal ones as defined by the specifications.

It is not recommended to construct tests using the `id` selector, however, if you do these are equivalent.

```typescript
context.find(id("myElement"));
context.find("#myElement");
```

# Other filters

- and(selector)
- empty
- firstChild
- has(selector)
- lastChild
- not(selector)
- only
