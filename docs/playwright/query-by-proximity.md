# Query by Proximity

Encourage selectors that "think like a human." Users do not think in terms of elements and classes. They look for certain visual cues and locations within the page. If they're filling out a form they're looking for the textbox by the "First Name" label to start typing. These proximity filters help you do that.

## Close by

### near(selector, distance?)

Identify an element by what it is close to with `near`.

```typescript
context.find("input", near("'First Name'"));
```

Optionally, with near, you can specify a max distance that determines "how near is near"? This second argument is in pixels.

```typescript
context.find("input", near("'First Name'"), 10);
```

## Directional

Sometimes `near` can yield undesirable results because it will pick up something else adjacent and not the element you intend to select. So it helps to be able to pick something within a certain direction.

These directional helpers will grab all matching elements in that direction, without any limtiation of how close. That may be something we can add in the future, but for now it's not a thing. Fortunately, it will sort the closest items first. Typically this will give you the element you're after or else you need to tighten it with additional filters.

### above(selector)

```typescript
context.find("=image", above("'My Picture Caption"));
```

### below(selector)

```typescript
context.find("=textbox", below("'Email Address'"));
```

### leftOf(selector)

```typescript
context.find("=image", leftOf("a.logo"));
```

### rightOf(selector)

```typescript
context.find("=link", leftOf("article"));
```

## Location on the Page

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
context.find("=image", near(topLeft));
```

Optionally, with `near`, we can specify how far away it's allowed to be (in pixels). The default is 50.

```typescript
context.find("=image", near(topLeft, 120));
```
