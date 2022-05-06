# Personas

Well written functional or end-to-end tests do not start by thinking about the code; they start by thinking about the user. By starting from the mindset of who is the user and what is their intent, it helps us get out of happy-path testing and facilitates better coverage for a wider range of use cases.

You do not need to use personas to use QA Flag, but you probably should.

We start defining a Persona by giving it a name. You can choose if you want to go all-in on the personhood of your persona (like you might a traditional user story) or if you want to name them descriptively (like "Logged In User" versus "Guest User").

Let's say our first user is our unauthenticated guest user. Create a new file in a shared location within your project. I recommend calling it something like `guest.persona.ts`.

```typescript
import { Persona } from "@qaflag/core";

export class GuestUser extends Persona("Guest User") {}
```

This user currently has no properties, other than its name (and the fact that it is not authenticated), so let's tell a define more about them.

```typescript
import { Android, Persona, Phone, Using, WebBrowser } from "@qaflag/core";

export class GuestUser extends Persona(
  "Guest User",
  Using(Android, Phone),
  WebBrowser("chrome")
) {}
```

With this additional context, QA Flag will apply appropriate defaults for all tests. This will include appropriate user agent, screen size, types of inputs accepted, etc.

Personas can also be used to initialize your test scenarios with authentication credentials. To do this, we will use a method with the `@Before` decorator to make a request and then handle the response.

```typescript
import {
  Android,
  Before,
  HttpResponse,
  Persona,
  Phone,
  Using,
  WebBrowser,
} from "@qaflag/core";

export class AuthenticatedUser extends Persona(
  "Authenticated User",
  Using(Android, Phone),
  WebBrowser("chrome")
) {
  @Before({
    uri: "POST /auth",
    data: {
      email: "foo@bar.com",
      password: "foobar123#~%",
    },
  })
  authenticate(response: HttpResponse) {
    this.bearerToken = response.data.token;
  }
}
```

The above example makes a call to our `/auth` endpoint with the given credentials. The resposne is handled by the method itself, and there we are applying some of the data that came back as our bearer token. All future requests using this persona will have that bearer token automatically applied. You can similarly set cookies, basic authentication, and any other request properties.

In other situations, you may not want to do the authentication directly to the API though before your tests run. You may want to authenticate as part of your scenario. A great approach is to put that logic within the persona and call that method, kind of like you would a helper method, from your actual scenario.

So you might define it like this for a Playwright/Browser test where we want click on the physical elements on the web site and type just like a user would:

```typescript

import {
  Android,
  Before,
  HttpResponse,
  Persona,
  Phone,
  Using,
  WebBrowser,
} from "@qaflag/core";

export class AuthenticatedUser extends Persona(
  "Authenticated User",
  Using(Android, Phone),
  WebBrowser("chrome")
) {
  async signIn(context: PlaywrightContext) {
    const signInButton = context.find("'Sign In'");
    const emailInput = context.find("'Email'");
    const passwordInput = context.find("'Password'");
    await emailInput.mouse.click();
    await emailInput.keyboard.input('someone123@gmail.com');
    await passwordInput.mouse.click();
    await passwordInput.keyboard.input('foobar');
    await signInButton.mouse.click();
    return context.waitForNavigation();
  }

```

Similarly, there might be redundant things that you find you're doing over and over again in your scenarios. These tasks are better defined within the Persona, again using them as basically helper methods to cut down on duplication. But, beyond that, it helps you further think about a specific user completing a given task. This makes the code more readable, more maintainable, and allows your different personas to have a little different personality from others. Not all users follow the same path!

For the signing in example, maybe one Persona tends to sign in by clicking each input box, typing, and then clicking the "Sign In" button. But another user may click on the first element, type, tab, type again, and then click the enter key. You can capture this with a custom `signIn` method for each persona.
