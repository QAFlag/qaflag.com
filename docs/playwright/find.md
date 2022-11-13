# Querying with Find

Using the [locator](/docs/playwright/locator) method is perfectly fine, but we can do better. The `find` method is its cousin and performs the same task; however, it wraps additional querying enhancements that can make writing selectors substantially more intuitive and easier to read.

Firstly you can do anything with `find` that you can do with locator. These will yield identical results:

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

## Proximity

Documentation to come...

- above(selector)
- below(selector)
- leftOf(selector)
- near(selector, distance?)
- rightOf(selector)

# Location on the page

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

# Type of element

We want to break the habit of having to use specific HTML tags or selectors to query for a specific element. Instead, we want to describe how the element appears to a user.

More documentation to come...

- bold
- button
- dropdown
- field
- header
- heading
- link
- main
- nav
- textbox

# State of an element

- disabled
- enabled
- hidden
- visible

# Relationship to other selectors

- parent(selector)
- within(selector)

# Position in matched results

- first
- last
- nth(n)

# Other filters

- empty
- firstChild
- lastChild
- only
