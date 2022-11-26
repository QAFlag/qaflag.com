## Query by Relationship to Other Elements

### within(selector)

It may be useful to constrain your search to a certain section of the page. Maybe you it's within a certain element:

```typescript
context.find("tr.selected", within("table.results"));
```

You can also use some of the QA Flag sugar to try to automatically identify a certain part of the page, like the navigation bar.

```typescript
context.find("=link", ".selected", within(nav));
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

### Has a child like this

Select an element that has a matching child node or text.

```typescript
context.find("fieldset", has('"First Name"'));
```

### But not this

Select an element that mathces criteria, but does not match this.

```typescript
context.find("=textbox", "*Name*", not("*First Name*"));
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
