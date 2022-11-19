# Visual Tests

You may want to do a visual inspection of the page or a certain element to make sure your styles didn't get busted.

## Look Like Assertion

To compare an element against a previous control image, use the `must.lookLike` assertion.

Arguments:

- **compareTo: string | Buffer** the control image (see documentation below for more details)
- **percent?: number** difference allowed - A value of 1 here would mean allow up to 1% of the pixels to be different. Default is 0.
- **opts?: { threshold?: number }** How forgiving of each pixel's diffence is allowed between 0 and 1. Default is 0.1

### Using an alias path

The recommended best practice is to use an alias path like this:

```typescript
const logo = context.find(image, near(topLeft));
await logo.must.lookLike("@logo");
```

The command above will look (by default) for a file called `./screenshots/logo.png` in your project's root folder. If you want to change the folder where these images are stored, edit your `qaflag.json` file and change `screenshotPath` property.

If QA Flag does not find a file at this location, it will take a screenshot of the element and save it to that location as the new control. In that case, the assertion will automaticallly pass. There will be a note in the log that a new control image was generated. This makes it easy to build your controls and to replace them if the design ever changes--just delete the control file.

If the file is found, it will compare it against a new screenshot.

The control image must be a PNG and must be the exact same size as the the screenshot.

### Using a file path

If you prefer, you can specify the exact file path to your control file.

```typescript
const logo = context.find(image, near(topLeft));
await logo.must.lookLike("/some/path/to/the/control.png");
```

While this is possible, it is not recommended. It leaves a lot of room for error and it can be hard to generate the control images that exactly match the screenshot.

### Using an array buffer

Finally, if you really really want to you can pass in a `Buffer` of a PNG image. This might be helpful, for example, if you are loading a control image from a URL.

```typescript
const response = await axios(url, { responseType: "arraybuffer" });
const buffer = Buffer.from(response.data, "binary");
const logo = context.find(image, near(topLeft));
await logo.must.lookLike(buffer);
```
