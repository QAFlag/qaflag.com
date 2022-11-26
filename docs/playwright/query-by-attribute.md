# Query by Attribute

You can use any standard CSS selector for attribute like:

```typescript
context.find("=link", "[target='_blank']");
```

For the most part using attribute selectors are not a best practice, because we want to write more human tests. But there are a few attributes that directly manifest themselves to a user that are perfectly acceptable:

- **title** - Shows as a tooltip to a user
- **placeholder** - Shows as the empty state text of an input box
- **alt** - Shows as alternate text, tooltips, or placeholder before an images loads

Slightly less "human" but you can also use:

- **href** - Where a link is going
- **src** - Path of an image

These can obviously still be utilized with standard CSS selectors, but QA Flag comes with some shorthand for these common ones to make it more concise, easy to read, and it also helps make better names in assertions.

```typescript
context.find("=textbox", "placeholder=Hometown");
context.find("=image", "alt=My Boston Terrier Puppy");
context.find("=link", "title=Back to Homepage");
```

The above examples require an exact match for the attribute value. This behaves idenitically to surrounding them in quotes:

```typescript
context.find("=textbox", "placeholder='Favorite College Team'");
```

If you want to do a fuzzy "contains" match, surrounded by wildcards `*`:

```typescript
context.find("=textbox", "alt=*dog*");
```

Surrounded by `^...*` for starts with:

```typescript
context.find("=link", "title=^Back*");
```

Or surrounded by `*...$` for ends with:

```typescript
context.find("=link", "title=*Home$");
```

There is an alternate syntax for any of these, if you prefer working with functions rather than these string selectors. Otherwise, it works exactly the same including the options outlined above for the value:

```typescript
context.find("=image", alt("My Boston Terrier Puppy"));
```
