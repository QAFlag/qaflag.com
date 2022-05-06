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
