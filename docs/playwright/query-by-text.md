# Querying by Text Contents

One of the most powerful things (and a best practice) is to search for things with certain text in them. This scans the page just like a user would.

## Exact Text Match

By putting _quotes-inside-the-quotes_, we tell QA Flag to look for the exact string, instead of looking for a traditional CSS selector.

Let's say we have a button like this:

```html
<button>Click Me</button>
```

We can find this button (and any other elements containing this string) with:

```typescript
context.find("'Click Me'");
```

This query will look for any elements containing _exactly_ the string "Click Me", with any leading or trailing whitespace trimmed. That means it would not match the element `<button>Click Me!</button>`.

This exact match is also case-sensitive, so it would not match an element `<button>click me</button>` either.

## Wildcard Text Match

If you need a more fuzzy match, which searches for the text anywhere within the element, then surround it by wildcards (`*`) instead of quotes:

```typescript
context.find("*click me*");
```

This would match any of our examples above. It looks for a matching substring within the element, and it is case-insensitive.

## Starts With Text Match

To find an element with text starting with a certain string, using the `^...*` syntax:

```typescript
context.find("^click*");
```

This is a case-insensitive search.

## Ends With Text Match

To find an element with text ending with a certain string, using the `*...$` syntax:

```typescript
context.find("*me$");
```

This is a case-insensitive search.

## Regular Expression Text Match

Lastly, you can also use a full-blown regular expression if you're feeling saucy. This gives you the full power and flexibility to find exactly the text you're looking for.

```typescript
context.find(/click me/i);
```

This is a standard JavaScript regular expression. The trailing `i` makes it case-insensitive. Leave it off if you want the search the be case sensitive.

```typescript
context.find(/Click Me/);
```

For more about JavaScript regular expression syntax read the [W3C Schools documentation](https://www.w3schools.com/jsref/jsref_obj_regexp.asp).
