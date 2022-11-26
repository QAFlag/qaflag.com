# Query by State

These seelctors are stanard CSS selectors, not anything proprietary. However, they're important to call out since they're important and can be used in conjunction with other selectors.

You can, of course, use them as standard CSS like this:

```typescript
const disabledInputs = context.find("input:disabled");
```

Or even as the primary selector:

```typescript
const allThingsChecked = context.find(":checked");
```

However, these selectors are more powerful as arguments to compliment the primary selector:

```typescript
context.find("=dropdown", ":disabled");
```

Some of the supported state selectors include:

- disabled
- enabled
- hidden
- visible
- checked
- read-only
- read-write
- active
- inactive
- focus
- invalid
- required
- optional
- default
- hover
