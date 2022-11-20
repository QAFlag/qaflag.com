# Mouse Input

## Click

```typescript
await context.find(button, '"Login"').mouse.click();
```

## Double Click

```typescript
await context.find(button, '"Login"').mouse.doubleClick();
```

## Triple Click

A triple click is useful for simulating how a user might click three times on an input element to select all of the text within it.

```typescript
await context.find(textbox, '"Title"').mouse.tripleClick();
```

## Longpress

On some devices, a longpress is used to open up some contextual dialog, change the element into a moveable state, or other things.

```typescript
await context.find(link, 'title="Menu"').mouse.longPress();
```

## Hover

```typescript
await context.find(button, '"Login"').mouse.hover();
```

## Select Text

Use the mouse to highlight all text within an input box.

```typescript
await context.find(textbox, '"First Name"').mouse.selectText();
```
