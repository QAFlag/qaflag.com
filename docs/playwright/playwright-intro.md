# E2E Browser with Playwright

Playwright is a remote-control browser created by Microsoft, similar to Google's Puppeteer or Selenium. In either headful (you see a browser) or headless (it runs hidden in the background) modes, you can execute tests just like you're a user clicking around the web site.

Here's a basic example with QA Flag:

```typescript
import { Scenario, Suite } from "@qaflag/core";
import { PlaywrightContext, PlaywrightScenario } from "@qaflag/playwright";

export class GoogleSearch extends Suite({
  title: "Test Google Search",
  type: PlaywrightScenario,
  baseUrl: "https://www.google.com",
}) {
  @Scenario({
    uri: "GET /",
  })
  async queryForJasonByrneGithub(context: PlaywrightContext) {
    const searchTerm = "Jason Byrne Github";
    const button = await context.find("'Google Search'");
    const textbox = await context.find("[aria-label='Search']");
    await textbox.must.be.visible();
    await button.must.be.visible();
    await textbox.keyboard.input(searchTerm);
    await button.mouse.click();
    await context.waitForNavigation();
    await context.exists("'Jason Byrne jasonbyrne - GitHub'");
    const searchValue = await textbox.value();
    searchValue.must.equal(searchTerm);
  }
}
```
