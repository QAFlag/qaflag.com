# Personas

Well written functional or end-to-end tests do not start by thinking about the code; they start by thinking about the user. By starting from the mindset of who is the user and what is their intent, it helps us get out of happy-path testing and facilitates better coverage for a wider range of use cases.

You do not need to use personas to use QA Flag, but you probably should.

We start defining a Persona by giving it a name. You can choose if you want to go all-in on the personhood of your persona (like you might a traditional user story) or if you want to name them descriptively (like "Logged In User" versus "Guest User").

Let's say our first user is our unauthenticated guest user. Create a new file in a shared location within your project. I recommend calling it something like `guest.persona.ts`.

```
import { Persona } from '@qaflag/core';

export class GuestUser extends Persona('Guest User') {}
```

This user currently has no properties, other than its name (and the fact that it is not authenticated), so let's tell a define more about them.

...
