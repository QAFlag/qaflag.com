# Querying with Role or Label

One of the best practices on the web for accessibility is using appropriate semantic HTML tags or ARIA attributes when that is not possible. This allows the browser (and screenreaders) to understand the function different parts of the page play. This semantic web has large benefits for testability, as well.

[More Information on ARIA...](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)

## Finding elements by ARIA Role

Whether you used the appropriate semantic tags or you added ARIA attributes, this method will work. TypeScript will keep you honest that you can only use standard role names.

```typescript
const allTextboxes = context.role("textbox");
```

Just this one argument can be useful in some instances, but usually you need to narrow the query further. The second argument allows you to zero in on a specific element. Let's say you have HTML like this with a "first name" field:

```html
<label>
  <span>Name</span>
  <input type="text" />
</label>
```

You can select it like this:

```typescript
const name = context.role("textbox", "Name");
```

This method to search by role and associated label will work whether that label uses a `<label>` tag, an `aria-label` attribute, or an `aria-labeledby` attribute. This also respects the `for` attribute on a label tag.

The query is case insensitive, searches for partial matches within, and trims leading or trailing whitespace. This probably works fine for many cases, but it is wildcard search on the label. So that means if there was also a textbox that says "Employer name", it would match that too.

This is the same thing as surrounding it by wildcards:

```typescript
const name = context.role("textbox", "*Name*");
```

### Exact Label Match

To do an exact match search, we'd surround it in a second-set of quotes:

```typescript
const name = context.role("textbox", "'Name'");
```

This search will require it to match the full text, it is case-sensitive, but it will still trim any leading or trailing whitespace.

### Regular Expression Label Match

If you need more flexibility, you can use regular expressions against the label:

```typescript
const name = context.role("textbox", /(First|Last) Name/i);
```

### Starts With Label Match

Use a `^` character (means start of string) on one side and a wildcard (`*`) on the other to find labels starting with a certain string.

```typescript
const name = context.role("textbox", "^Name*");
```

### Ends With Label Match

Use a wildcard (`*`) character at the start and a `$` character (means end of string) at the other side to find labels that end with this.

```typescript
const name = context.role("textbox", "*Name$");
```

## Finding elements by ARIA Label

If you need to search for a certain label without the further context of a role, use the `label` selector.

```typescript
const startDate = context.label("Start Date");
```

All of the documentation from `role` above still applies for exact and fuzzy matching of labels.
