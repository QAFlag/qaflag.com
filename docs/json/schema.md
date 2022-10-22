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
    uri: "GET /school/1",
    schema: SchoolDto
})
async getOneSchool(context: JsonContext) {}
```

That's it. Without any assertions inside the method, we automatically validate the response body.

For more details about the syntax see: <https://www.npmjs.com/package/class-validator>

## Using AJV

QA Flag can also use the powerful validation library called [AJV](https://ajv.js.org/) as an alternative to a DTO. This supports two different schemas for JSON: JTD (default) and JSON Schema.

We use a '@nameOfSchema` syntax that allows us to generate a "control" version of the schema the first time, when the file does not exist. This will validate against that control if the file does exist.

The documentation here is not complete... more to come to better explain the details.

### JSON Type Definition (JTD)

QA Flag can support schemas in [JSON Type Definition (or "JTD") format](https://jsontypedef.com/)

```typescript
@Scenario({
    uri: "GET /school/1",
    schema: "@school"
})
async getOneSchool(context: JsonContext) {}
```

or

```typescript
@Scenario({
    uri: "GET /school/1",
    schema: { name: "@school", type: "JTD" }
})
async getOneSchool(context: JsonContext) {}
```

.... More Coming ...

<https://jsontypedef.com/>

### JSON Schema

QA Flag can support schemas in [JSON Schema format](https://json-schema.org/)

```typescript
@Scenario({
    uri: "GET /school/1",
    schema: { name: "@school", type: "JsonSchema" }
})
async getOneSchool(context: JsonContext) {}
```

... More Coming ...

<https://json-schema.org/>
