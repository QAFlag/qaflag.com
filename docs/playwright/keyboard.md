# Keyboard Interactions

Once you have queried the element you want to interact with, use the `keyboard` namespace to type within it.

## Type a string

```typescript
await city.keyboard.type("Orlando");
```

## Type a string, but mask the output

This is useful if you don't want a password to show up in the test logs.

```typescript
await password.keyboard.typeMasked("#ydlk42nk!lk3");
```

# Press a key

Press the key down and then let it up, like a user normally would when typing.

```typescript
await city.keyboard.press("O");
```

If you want to press a modifer key (like shift or command) together with your key you can do so like this:

```typescript
await element.keyboard.press(["Meta", "K"]);
```

The "Meta" keyword here matches the appropriate command key on both Windows and Mac.

# Key down and up

The same syntax as `press` but `down` holds the key down continally. It will continue to be pressed until you call `up`.

```typescript
await element.keyboard.down("a");
await sleep(1000);
await element.keyboard.up("a");
```

## Select All

Control/Command+A

```typescript
await element.keyboard.selectAll();
```

## Copy

Control/Command+C

```typescript
await element.keyboard.copy();
```

## Cut

Control/Command+X

```typescript
await element.keyboard.cut();
```

## Paste

Control/Command+V

```typescript
await element.keyboard.paste();
```

## Backspace

```typescript
await element.keyboard.backspace();
```

## Enter

```typescript
await element.keyboard.enter();
```

## Delete

```typescript
await element.keyboard.delete();
```

## Escape

```typescript
await element.keyboard.escape();
```

## Tab

```typescript
await element.keyboard.tab();
```

## Arrow Up

```typescript
await element.keyboard.arrowUp();
```

## Arrow Down

```typescript
await element.keyboard.arrowDown();
```

## Arrow Left

```typescript
await element.keyboard.arrowLeft());
```

## Arrow Right

```typescript
await element.keyboard.arrowRight();
```

## Press Special Keys

We have some easy methods for common ones like `backspace()` but this method gives you type-safety and intellisense to know what strings are valid special keys. So this can do anything like PageUp, Home, End, F1-F12, CapsLock, etc.

```typescript
await element.keyboard.pressSpecial("PageDown");
```
