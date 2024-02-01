[![npm](https://img.shields.io/npm/v/@egomobile/documentation.svg)](https://www.npmjs.com/package/@egomobile/documentation)
[![last build](https://img.shields.io/github/workflow/status/egomobile/node-documentation/Publish)](https://github.com/egomobile/node-documentation/actions?query=workflow%3APublish)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/egomobile/node-documentation/pulls)

# @egomobile/documentation

> Tools for documenting (TypeScript) code.

## Install

Execute the following command from your project folder, where your `package.json` file is stored:

```bash
npm install --save @egomobile/documentation
```

## Usage

```typescript
import {
    defaultDependencies,
    DependsOn,
    functionDependsOn
} from "@egomobile/documentation";

@DependsOn({
  // an unique ID of the "remote" app that
  // has a dependency on this class
  app: "id-of-my-app",

  // optional remarks for this app
  remarks: "Changes made by this class will update entities in this app",

  // list of entities that are
  // affected in `app`
  entities: [
    {
      // an unique ID of the entity in `app`
      // like the name of a database table
      // or collection
      key: "tdta_user",

      // optional remarks for this entity
      remarks: "Changes made by this class will update this entity",

      // list of entities that are
      // affected in that entity
      attributes: [
        {
          // an unique ID of the attribute
          // inside the entity in like the name of
          // column
          key: "email",

          // optional remarks for this entity attribute
          remarks: "Changes made by this class will update this attribute",
        },
      ],
    },
  ],
})
class MyDocumentedClass {
    // you can also save information
    // about a property
    @DependsOn({ ... })
    public aProp: any;

    // you can also save information
    // about a method
    @DependsOn({ ... })
    public aMethod(
        // you can also save information
        // about a method parameter
        @DependsOn({ ... }) aParam: any
    ) {
        // ...
    }
}

function myFunction() {
  // ...
}
// do this for functions as well
functionDependsOn(myFunction);

console.log(
    // by default all information are
    // stored in this module-wide array
    defaultDependencies
);
```

## Documentation

The API documentation can be found [here](https://egomobile.github.io/node-documentation/).
