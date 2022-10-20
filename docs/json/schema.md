# Assert a Schema

Rather than making a bunch of individual assertions against the response body, we can define the schema of the response and assert it all at once. We have three types of schema definitions to choose from.

For these examples, let's assume the JSON response body:

```json
{
  "id": 1,
  "name": "University of Central Florida"
}
```

## DTO with Class Validator

The easiest way to do this is with the popular [class-validator](https://www.npmjs.com/package/class-validator) library. We can define a DTO (or "Data Transfer Object") by defining a class with decorators.

For example, let's define your DTO as a file called `school.dto.ts`

```typescript
export class SchoolDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
```

At the top of your test suite, import it like this:

```typescript
import { SchoolDto } from "./school.dto";
```

Now when you define your scenario, pass this reference to the `schema` argument:

```typescript
@Scenario({
    uri: "GET /school/1"
    schema: SchoolDto
})
async getOneSchool(context: JsonContext) {}
```

That's it. Without any assertions inside the method, we automatically validate the response body.

For more details about the syntax see: [https://www.npmjs.com/package/class-validator]

## JTD

.... Coming ...

## JSONSchema

... Coming ...
