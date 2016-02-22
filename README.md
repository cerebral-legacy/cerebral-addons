# cerebral-addons [![Build Status](https://secure.travis-ci.org/cerebral/cerebral-addons.png?branch=master)](https://travis-ci.org/cerebral/cerebral-addons)

An actions and factories utility belt for Cerebral.

## Usage

```js
import set from 'cerebral-addons/set';
import unset from 'cerebral-addons/unset';
```

## Data paths

cerebral-addons allow you to set, copy, unset or check values across multiple data sources and
destinations. To simplify the mechanism of addressing these values cerebral-addons uses URLs.

```
scheme:[//host]/path
```

where `scheme` can be one of:

* `input` - (readonly)
* `state` - (readwrite)
* `output` - (writeonly)

the optional `host` is the module name (only applicable to the `state` scheme). Alternatively the module's
alias can be used.

the `path` is the relative data location to get or set.

When a signal is defined, cerebral-addons will "pre-compile" these URLs into performant functions
so that at run time the URL does not need to be parsed. See the Factory Helpers section below
for information on how you can integrate these URLs into your own actions.

#### Examples

user name from the input (readonly) `{ user: { name: 'Brian' } }`
```
input:/user.name
```

user name from the root of the store
```
state:/user.name
```

user name within a `users` module area of the store
```
state://users/user.name
```

user name to the output (writeonly)
```
output:/user.name
```

## Action Factories

#### copy
Copies a value from input, global state or module state to output, global state or module state.

* `copy(from, to)`

```js
// copy serverSettings from input to the store at /settings
signal('settingsOpened', [
  [
    getServerSettings, {
      success: [
        copy('input:/serverSettings', 'state:/settings')
      ]
      error: []
    }
  ]
]);
```

```js
// copy newAccount from account module state to output
signal('newAccountCreated', [
  copy('state://account/newAccount', 'output:/newAccount'),
  [
    ajax.post('/new-account'), {
      success: []
      error: []
    }
  ]
]);
```

Copy also supports output chains which can be useful for filtering or other tasks. Any item in the chain can be async so long as it returns a promise, the copy helper will detect this and make the whole copy action async. (see setters below for more details)

```js
const plusOne = (args, value) => value + 1;

signal('increment', [
  copy('state://count', plusOne, 'state:/count'),
]);
```

#### debounce

* `debounce(time, continueChain, { terminateChain = [], immediate = true })`

debounce can be used to limit the number a times an actionChain is called, for example on keyboard activity.

By default the first signal call will execute the continueChain immediately and the last call during the time
will execute at the end. To change this to only execute the most recent continueChain at the end, set the
options to `{ immediate: false }`.

It is also possible to pass a `terminateChain` to the options which will be called whenever a signal is terminated.

```js
signal('fieldChanged', [
  copy('input:/value', 'state:/form.field'),
  debounce(500, [
    validateForm
  ])
]);
```

#### set

* `set(path, value)`

```js
signal('optionsFormOpened', [
  set('state:/isLoading', 'true'),
  [getOptionsFromServer, {
    success: [],
    error: []
  }],
  set('state:/isLoading', 'false')
]);
```

#### toggle

* `toggle(path)`

```js
// toggle the menu between true and false
signal('menuToggled', [
  toggle('state:/menu')
]);

// toggle the switch between "On" and "Off"
signal('switchToggled', [
  toggle('state://moduleName/switch', 'On', 'Off')
]);
```

#### unset

* `unset(path)`

```js
signal('itemDeleted', [
  unset('item')
]);
```

#### when

When can be used to check input or state for a specific value, truthy or falsy and then run an action chain when the condition is matched. To check multiple paths, see the operators section below. If no `when.otherwise` condition is provided then an `otherwise` output path will be created for you.

* `when(path, conditions = { 'true': when.truthy, 'false': when.otherwise })`

when exports the following symbols

* `when.truthy`
* `when.falsy`
* `when.otherwise`

```js
// simple when using default outputs
signal('reloadData', [
  when('state:/isLoading'), {
    true: [tryAgainLater],
    false: [doReload]
  }
]);
```

```js
// create custom output path names
let whenUser = when('state://users/currentUser', {
  isLoggedIn: when.truthy,
  isUnknown: when.otherwise
});

signal('securePageOpened', [
  whenUser, {
    isLoggedIn: [getPageData],
    isUnknown: [redirectToHome]
  }
]);
```

```js
// check for specific values
let whenFormIsValid = when('state:/form.errorMessage', {
  valid: 'no errors found',
  invalid: when.otherwise
});

signal('formSubmitted', [
  validateForm,
  whenFormIsValid, {
    valid: [sendToServer],
    invalid: [showErrorSnackBarMessage]
  }
]);
```

```js
// check for specific values against an array of possible matches
signal('somethingHappened', [
  when('input:/actionType', [ 'close', 'open' ]), {
    close: [],
    open: [],
    otherwise: []
  }
]);
```

## Operators

In place of the data paths, cerebral-addons supports operators. There are two types of operators,
a getter operator and a setter operator. If either of these operators is detected to by async
(indicated by the returning of a promise) then the addon must be marked as async in the chain and
subsequently define success and error paths.

### getters

A getter is a function that accepts the args passed to an action method and returns some value.

```js
// getter should return a value or a promise which will later resolve to a value
[promise] getter(args)
```

#### Example
an example getter might get some data from the server:
```js
// define the getter
function httpGet(url) {
  return function (args) {
    return new Promise(resolve => {
      getDataFromServer(url, function (err, data) {
        resolve(data)
      })
    })
  }
}

// use the getter
[
  copy(httpGet('/api/date.json'), 'state:/date'), {
    success: [],
    error: []
  }
]
```

### setters

A setter is a function that accepts the args passed to an action method and the value to set.

```js
// if the setter returns a promise then the addon will wait for it to resolve before continuing
[promise] setter(args, value)
```

if the setter is async then the addon will also pass on the resolve value to the success chain

#### Example
an example setter might post some data to the server:
```js
// define the setter
function httpPost(url) {
  return function (args, value) {
    return new Promise(resolve => {
      postDataToServer(url, value, function (err, data) {
        resolve(data) // response from server will be passed onto success chain
      })
    })
  }
}

// use the setter
[
  copy('state:/date', httpPost('/api/date.json')), {
    success: [],
    error: []
  }
]
```

### included getters

cerebral-addons includes the following getters

#### and

```js
signal('doSomethingWhenBothAreTrue', [
  when(and('state:/firstCondition', 'input:/otherCondition')), {
    true: [],
    false: []
  }
]);
```

#### compose

Compose replaces all getters found in object given to the compose factory with the runtime values

> Compose doesn't currently support async getters

```js
signal('doSomething', [
  copy(compose({
    fromInput: get('input:/value'),
    fromState: get('state:/value')
  }), 'output:/composed')
]);
```

#### get

see `compose`

#### isEqual

```js
signal('doSomethingWhenBothAreEqual', [
  when(isEqual('state:/firstValue', 'input:/otherValue')), {
    true: [],
    false: []
  }
]);
```

#### isDeepEqual

```js
signal('doSomethingWhenBothAreSame', [
  when(isDeepEqual('state:/firstValue', 'input:/otherValue')), {
    true: [],
    false: []
  }
]);
```

#### literal

```js
signal('doSomething', [
  copy(literal('literal'), 'output:/value')
]);
```

#### not

```js
signal('doSomethingWhenBothAreTrue', [
  when(and('state:/firstCondition', not('input:/otherCondition'))), {
    true: [],
    false: []
  }
]);
```

#### or

```js
signal('doSomethingWhenBothAreTrue', [
  when(or('state:/firstCondition', 'input:/otherCondition')), {
    true: [],
    false: []
  }
]);
```

#### findWhere

```js
copy(findWhere('state:/users', { name: 'John' }), 'output:/john')
```

#### pop

> pop also modifies the array in the state

```js
copy(pop('state:/users'), 'output:/lastUser')
```


#### shift

> shift also modifies the array in the state

```js
copy(shift('state:/users'), 'output:/firstUser')
```

### Included setters

cerebral-addons includes the following setters

#### merge

```js
copy('input:/newData', merge('state:/allData'))
```

#### push

```js
copy('input:/newUser', push('state:/users'))
```

#### unshift

```js
copy('input:/newUser', unshift('state:/users'))
```

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es6 to es5
