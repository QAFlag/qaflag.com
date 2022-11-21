# Mouse Input

## Click

```typescript
await element.mouse.click();
```

## Double Click

```typescript
await element.mouse.doubleClick();
```

## Triple Click

A triple click is useful for simulating how a user might click three times on an input element to select all of the text within it.

```typescript
await element.mouse.tripleClick();
```

## Longpress

On some devices, a longpress is used to open up some contextual dialog, change the element into a moveable state, or other things.

```typescript
await element.mouse.longPress();
```

## Hover

```typescript
await element.mouse.hover();
```

## Select Text

Use the mouse to highlight all text within an input box.

```typescript
await element.mouse.selectText();
```
