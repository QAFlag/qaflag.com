# Interacting with Forms

Use the `form` property on any selected element to handle form input.

Note: In the following examples the `context.find(...)` portion can be whatever selector you nee to locate your form field.

## Filing out a form

### Input Text

Using fill will replace any existing content within a textbox, so you do not need to separately clear it.

```typescript
await context.find(textbox, label("Title")).form.fill("It's so easy!");
```

### Clear Value

To remove all input from any form field.

```typescript
await context.find(textbox near("Title")).form.clear();
```

### Check or Uncheck

To check a checkbox:

```typescript
await context.find(checkbox, leftOf("I agree")).check();
```

To uncheck a checkbox:

```typescript
await context.find(checkbox, leftOf("Sign me up for email list")).check(false);
```

### Select Option from Dropdown

To choose a dropdown option by its text, you can do either of the following:

```typescript
await context.find(label("State")).select("'Florida'");
await context.find(label("State")).select({ label: "Florida" });
```

To choose a dropdown option by its value, you can do either of the following:

```typescript
await context.find(label("State")).select("FL");
await context.find(label("State")).select({ value: "FL" });
```

To choose a dropdown by its 0-based index in the dropdown list, you can do either of the following:

```typescript
await context.find(dropdown, by("State")).select(7);
await context.find(dropdown, by("State")).select({ index: 7 });
```

### Choose a File

```typescript
await context.find(fileInput, label("Logo")).file("./fixtures/logo.png");
```

## Getting values from form inputs

### value()

Select the value from any form control including textboxes, dropdowns, etc.

```typescript
const value = await context.find(textbox, placeholder("First Name")).value();
```

### selectedText()

Instead of the value, if you want to get the text from the selected option on a dropdown.

```typescript
const text = await context.find(dropdown, title("Age")).selectedText();
```

### selectedIndex()

Get the zero-based index of the selected element of a dropdown.

```typescript
const text = await context.find(dropdown, title("Age")).selectedText();
```

## Asserting aginst form values

### Must Have Value

Assert against the value of any form control.

```typescript
await context.find(label("First Name")).must.have.value("Jason");
```

### Must Have Selected Text

Instead of the value, you want to assert the text of the selected option of a dropdown.

```typescript
await context.find(label("State")).must.have.selectedText("Florida");
```

### Must Have Focus

```typescript
await context.find(dateInput, near("Birthday")).must.have.focus();
```

### Must Be Checked

```typescript
await context.find(checkbox, by("I agree")).must.be.checked();
```

### Must Be Unchecked

```typescript
await context.find(checkbox, by("mailing list")).must.be.unchecked();
```

### Must Be Disabled

```typescript
await context.find(label("Favorite Color")).must.be.disabled();
```

### Must Be Enabled

```typescript
await context.find(label("Favorite Color")).must.be.enabled();
```
