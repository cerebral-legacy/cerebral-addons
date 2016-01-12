# cerebral-addons

An actions and factories utility belt for Cerebral.

## Usage

import all addons

```js
import { set, unset } from 'cerebral-addons';
```

import individual addons

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

the optional `host` is the module name (only applicable to the `state` scheme). To address the
current module where the name may not be known `//.` can be used. Alternatively the module's
alias could be used.

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

users name within the current module's area of the store
```
state://./user.name
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

When can be used to check input or state for a specific value, truthy or falsy and then run an action chain when the condition is matched.

* `when(path, outputs={ isTrue: when.truthy, isFalse: when.otherwise }, emptyObjectsAreFalse=true)`

when exports the folowing symbols

* `when.truthy`
* `when.falsy`
* `when.otherwise`

```js
// simple when using default outputs
signal('reloadData', [
  when('state:/isLoading'), {
    isTrue: [tryAgainLater],
    isFalse: [doReload]
  }
]);
```

```js
// create custom output path names
let whenUser = when('state://users/currentUser', { isLoggedIn: when.truthy, isUnknown: when.otherwise });

signal('securePageOpened', [
  whenUser, {
    isLoggedIn: [getPageData],
    isUnknown: [redirectToHome]
  }
]);
```

```js
// check for specific values
let whenFormIsValid = when(['state:/form', 'errorMessage'], { valid: 'no errors found', invalid: when.otherwise });

signal('formSubmitted', [
  validateForm,
  whenFormIsValid, {
    valid: [sendToServer],
    invalid: [showErrorSnackBarMessage]
  }
]);
```

## Factory Helpers

cerebral-addons exposes some helpers which can be useful for applications wishing to make use of some of
same functionality used by cerebral-addons in their own actions.

#### getCompiler

converts a path URL, string or array into an efficient getter function

```js
import getCompiler from 'cerebral-addons/getCompiler';

// some action factory
export default function (fromPath) {
  // "compile" the fromPath into a getValue function
  const getValue = getCompiler(fromPath);
  // return an action
  return function myAction (args) {
    let value = getValue(args);
    // do something with value ...
  }
}
```

#### setCompiler

converts a path URL, string or array into an efficient setter function

```js
import setCompiler from 'cerebral-addons/setCompiler';

// some action factory
export default function (toPath) {
  // "compile" the toPath into a setValue function
  const setValue = setCompiler(toPath);
  // return an action
  return function myAction (args) {
    // do something to get the value
    setValue(args, value);
  }
}
```

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es6 to es5
