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

## Action Factories

#### set

* `set(statePath, value)`

```js
signal('optionsFormOpened', [
  set('isLoading', 'true'),
  [getOptionsFromServer, {
    success: [],
    error: []
  }],
  set('isLoading', 'false')
]);
```

#### toggle

* `toggle(statePath)`

```js
// toggle the menu between true and false
signal('menuToggled', [
  toggle('menu')
]);

// toggle the switch between "On" and "Off"
signal('switchToggled', [
  toggle('switch', 'On', 'Off')
]);
```

#### unset

* `unset(statePath)`

```js
signal('itemDeleted', [
  unset('item')
]);
```

#### when

When can be used to check state for a specific value, truthy or falsy and then run an action chain when the condition is matched.

* `when(statePath, outputs={ isTrue: when.truthy, isFalse: when.otherwise }, emptyObjectsAreFalse=true)`

when exports the folowing symbols

* `when.truthy`
* `when.falsy`
* `when.otherwise`

```js
// simple when using default outputs
signal('reloadData', [
  when('isLoading'), {
    isTrue: [tryAgainLater],
    isFalse: [doReload]
  }
]);
```

```js
// create custom output path names
let whenUser = when('user', { isLoggedIn: when.truthy, isUnknown: when.otherwise });

signal('securePageOpened', [
  whenUser, {
    isLoggedIn: [getPageData],
    isUnknown: [redirectToHome]
  }
]);
```

```js
// check for specific values
let whenFormIsValid = when(['form', 'errorMessage'], { valid: 'no errors found', invalid: when.otherwise });

signal('formSubmitted', [
  validateForm,
  whenFormIsValid, {
    valid: [sendToServer],
    invalid: [showErrorSnackBarMessage]
  }
]);
```

#### inputToState
Copies a property of the action input to the store, nested paths are supported by using `['parent', 'child']` syntax.

* `inputToState(inputPath, statePath)`

```js
signal('settingsOpened', [
  [
    getServerSettings, {
      success: [
        inputToState('serverSettings', ['settings'])
      ]
      error: []
    }
  ]
]);
```

#### stateToOutput
Copies a property of the store to the output of the action

* `stateToOutput(statePath, outputPath)`

```js
signal('newAccountCreated', [
  stateToOutput(['newAccount'], ['postData', 'newAccount']),
  [
    ajax.post('/new-account'), {
      success: []
      error: []
    }
  ]
]);
```

## Experimental Actions

There are also a number of [experimental actions](experimental.md).

## Contribute

Fork repo

* `npm install`
* `npm run dev` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es6 to es5
