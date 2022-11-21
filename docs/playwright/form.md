# Interacting with Forms

Use the `form` property on any selected element to handle form input.

Note: In the following examples the `context.find(...)` portion can be whatever selector you nee to locate your form field.

## Filing out a form

### Input Text

Using fill will replace any existing content within a textbox, so you do not need to separately clear it.

```typescript
await element.form.fill("It's so easy!");
```

### Clear Value

To remove all input from any form field.

```typescript
await element.form.clear();
```

### Check or Uncheck

To check a checkbox:

```typescript
await element.check();
```

To uncheck a checkbox:

```typescript
await element.check(false);
```

### Select Option from Dropdown

To choose a dropdown option by its text:

```typescript
await element.chooseOption("'Florida'");
```

To choose a dropdown option by its value:

```typescript
await element.chooseOption("FL");
```

To choose a dropdown by its 0-based index in the dropdown list:

```typescript
await element.chooseOption(7);
```

### Choose a File

```typescript
await element.chooseFile("./fixtures/logo.png");
```

### Choose a Date

```typescript
await element).chooseDate("2002-03-26");
```

## Getting values from form inputs

### value()

Select the value from any form control including textboxes, dropdowns, etc.

```typescript
const value = element.value();
```

### selectedText()

Instead of the value, if you want to get the text from the selected option on a dropdown.

```typescript
const text = element.selectedText();
```

### selectedIndex()

Get the zero-based index of the selected element of a dropdown.

```typescript
const text = element.selectedText();
```

## Asserting aginst form values

### Must Have Value

Assert against the value of any form control.

```typescript
await element.must.have.value("Jason");
```

### Must Have Selected Text

Instead of the value, you want to assert the text of the selected option of a dropdown.

```typescript
await element.must.have.selectedText("Florida");
```

### Must Have Focus

```typescript
await element.must.have.focus();
```

### Must Be Checked

```typescript
await element.must.be.checked();
```

### Must Be Unchecked

```typescript
await element.must.be.unchecked();
```

### Must Be Disabled

```typescript
await element.must.be.disabled();
```

### Must Be Enabled

```typescript
await element.must.be.enabled();
```

### Must Be Valid

The value of this form input must be considered valid based on any criteria like min or max length, patterns, required, etc.

```typescript
await element.must.be.valid();
```

### Must Be Required

The form input must be marked required

```typescript
await element.must.be.required();
```
