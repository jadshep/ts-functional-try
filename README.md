# functional-try
> Error handling wrapper for cleaner use of strict type checking in TypeScript

This library is intended to replace `await-to-js` in projects using TypeScript with `strict` settings.

## Install
```sh
npm i functional-try
```

## Motivation
I use `await-to-js` quite extensively in TypeScript projects, with a pattern similar to:

```ts
const [err, res] = await to(someAsyncFunction(params));

if (err) {
    handleError(err);
    return;
}

doSomethingWithRes(res);
```

But this doesn't work well with strict typing. Even though the return type of `to` indicates that `err` and `res` should be mutually exclusive, TypeScript still thinks `res` is possibly `undefined` due to the deconstruction severing the logical connection between the two.

This can be avoided by just not deconstucting:

```ts
const asyncRes = await to(someAsyncFunction(params));

if (asyncRes[0]) {
    handleError(asyncRes[0]);
    return;
}

handleSuccess(asyncRes[1]);
```

In this case TypeScript knows that by the time `handleSuccess` is called `asyncRes[1]` has a value because `asyncRes[0]` doesn't, avoiding the type error. But this doesn't result in very readable code.

This package functions nearly identical to `await-to-js`, just returning an object instead of a tuple, making usage without deconstruction cleaner.


## Usage

### Import
```ts
import { trySync, tryAsync } from 'functional-try';
```

### Synchronous
`trySync` takes a function and the parameters to invoke it with. It will synchronously call the function, automatically catch any errors, and return an object containing the function's result or caught error.

```ts
const parsedJson = trySync(JSON.parse, fileString);

if (!parsedJson.success) {
    console.log('Error parsing JSON', parsedJson.error);
    return;
}

handleSuccess(parsedJson.value);
```

### Asynchronous
`tryAsync` takes a promise and returns another promise that resolves to an object containing the first's result or caught error.

```ts
const asyncRes = await tryAsync(someAsyncFunction(params));

if (!asyncRes.success) {
    handleError(asyncRes.error);
    return;
}

handleSuccess(apiRes.value);
```
