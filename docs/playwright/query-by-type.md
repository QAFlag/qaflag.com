# Type of element

We want to break the habit of having to use specific HTML tags or selectors to query for a specific element. Instead, we want to describe how the element appears to a user. QA Flag has many common keywords so that you can select elements by the type of control or area of the page.

```typescript
context.find("=textbox");
```

In order for this type of element selection to work, you should focus on creating semantic code. Use the proper HTML tags for the proper things such as sections on your site or interaction elements. If you create custom controls that don't use the semantic tags, you can use `role` attributes. These are best practices anyway for creating an accessible web application. So do it!

QA Flag does make some additional efforts to grab these elements based on common CSS frameworks and other practices of how you might name elements, attributes, or classes. However, for best results: stick with the standards of semantic web and accessibility!

Here are the available keywords:

- banner = Top section of the site with the logo and masthead or `role="banner"`
- strong = Large text such as headings, bold, strong, or `role="strong"`
- button = Elements resembling a button like `<button>`, `<input type="submit">`, `role="button"` or `class="btn"`
- checkbox = Checkbox elements like `<input type="checkbox">` or `role="checkbox"`
- dialog = Modals and dialog boxes, including native ones and those of popular frameworks, `<modal>` or `role="dialog"`
- dropdown = Dropdown components like the native `<select>` or `role="dropdown"`
- heading = A text heading like `<h1>`, `<h2>`, etc. or `role="heading"`
- image = Any image type item including `<img>`, `<picture>`, `<svg>`, or `role="img"`. This will not grab things with a CSS background image.
- link = Any type of link with `<a>` and a href attribute, `role="link"`
- main = Main section of the site. Includes `<main>` and `role="main"`
- nav = Main navigation of the site. Includes `<nav>` and `role="navigation"`
- radio = Radio buttons with `<input type="radio">` or `role="radio"`
- textbox = Any `<input>` that allows you to type (text, search, tel, url, etc) in it or a `<textarea>`, `role="textbox"`
- fileInput - `<input type="file">`
- dateInput - `<input type="date">` and similar date or time selectors
- colorInput - `<input type="color">`
- region - `<section>`, `role="region"`
- form - `<form>`, `role="form"`
- listItem - `<li>`, `role="listitem"`
- table - `<table>`, `role="table"`
- row - `<tr>`, `role="row"`
- cell - `<td>`, `role="cell"`
- fullscreen - Find the element that is currently in fullscreen mode

Examples:

```typescript
context.find("=textbox", under("'First Name'"));
context.find("=link", within(nav));
context.find("=image", within(header));
context.find("=main");
```
