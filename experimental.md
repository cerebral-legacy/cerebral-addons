# Experimenal actions

Use with caution, experimantal actions may be modified or removed in future versions of cerebral-addons. If they are approved for general use then they will be moved into the default set of actions exported by cerebral-addons.

These actions can be use by importing via the following import statement:

```js
import { timer } from 'cerebral-addons/experimental';
```

validation is also dependant on the `email-validator` node module which will need to be manually installed:

```js
npm install email-validator
```

#### ajax

* `ajax.get(url='', inputUrlPath=null)`
* `ajax.post(url='', inputUrlPath=null)`
* `ajax.put(url='', inputUrlPath=null)`
* `ajax.del(url='', inputUrlPath=null)`

Each action will call either a `success` or `error` path, the response from the server will be passed as the input to the actions in the path.

All ajax actions are dependent on `superagent` which should be provided to the action methods via `servcies.request`:

```js
import request from 'superagent';

// ...

const services = {
  request
};

export default Controller(model, services);
```

To get data from the server:

```js
signal('pageOpened', [
  [ajax.get('/api/pagedata'), {
    success: [setPageData],
    error: [setErrorMessage]
  }]
]);
```

To send data to the server:

```js
// the value at input.data will be posted to the server
signal('pageSaved', [
  [ajax.post('/api/pagedata'), {
    success: [],
    error: [setErrorMessage]
  }]
]);

// to call the signal
signals.pageSaved({ data: { pageData: 'send to server' } })
```

Of course the data can be extracted from the cerebral state also:

```js
signal('pageSaved', [
  copyStateToOutput('pageData', ['data', 'pageData']),
  [ajax.post('/api/pagedata'), {
    success: [],
    error: [setErrorMessage]
  }]
]);
```

To use a dynamic url:

```js
// put ['pageData'] to /api/pagedata/:id
signal('pageSaved', [
  copyStateToOutput('pageData', ['data', 'pageData']),
  [ajax.put('/api/pagedata/', ['pageDate', 'id']), {
    success: [],
    error: [setErrorMessage]
  }]
]);
```

#### resetState

* `resetState()` reset the whole store
* `resetState(nodeName)` reset a node within the store

`resetState` is depent on an `services.initialState` property being available. To set this up in your  controller do the following:

```js
// the initial state of the app
const state = {
  isLoading: false,
  form: {
    initialValue: 1
  }
};

// services which are passed to actions
const services = {
  // initial state used by reset action
  initialState: state
};

export default Controller(Model(state), services);
```

```js
// reset the whole store
signal('signedOut', [
  resetState()
]);

// reset parts of the store
signal('formResetClicked', [
  resetState('form')
]);
```

#### resetStateExcept

* `resetStateExcept(statePath, statePath, ...)` reset all state except for the values at the given state paths

The same controller setup as resetState above is required.

```js
signal('loggedOut', [
  resetStateExcept('publicData')
]);
```

#### timeout (async)
```js
// Run a single action
signal('appMounted', [
  timeout(1000, myAction)
]);

// Run a chain
signal('appMounted',
  timeout(1000, myActionChain)
);

// Run async parallell
signal('appMounted', [
  [
    otherAsyncAction,
    ...timeout(1000, myAction)
  ]
]);
```

#### timer
Timer consistes of 4 action factories, they are all async so that they are skipped over by the debugger when replaying signals.

* `timer.start(timerKey, timeout, {
  timeout: [onTimeoutActionsArray],
  cancel: [onCancelActionsArray]
})`
* `timer.pause(timerKey)`
* `timer.restart(timerkey)`
* `timer.cancel(timerkey, outputData)`

Simple case:

```js
signal('messageReceived', [
  showMessageToUser,
  timer.start('message', 5000),
  hideMessageFromUser
]);
```

More complex case:

```js
signal('messageReceived', [
  showMessageToUser,
  timer.start('message', 5000, {
    timeout: [
      onTimeoutAction
    ],
    cancel: [
      onCancelAction
    ]
  }),
  hideMessageFromUser
]);

signal('mouseHoveredOverMessage', [
  timer.pause('message')
]);

signal('mouseOutMessage', [
  timer.restart('message')
]);

signal('userDismissedMessage', [
  // any data passed in the optional second parameter will
  // be forwarded to the onCancelAction input
  timer.cancel('message', optionalData)
]);
```

#### validation

* `validate.email(statePath, { errorPath=null, errorKey=null})`
* `validate.required(statePath, { errorPath=null, errorKey=null })`
* `validate.equal(statePath, compareStatePath, { errorPath=null, errorKey = null})`
* `validate.password(statePath, passwordOptions)`
* `validate.check(statePath)` checks if statePath passed all validations and outputs either `isValid` or `isInvalid` paths

```js
//password options:
{
  errorPath = null,
  errorKey = null,
  minLength = 8,
  maxLength = 128,
  minPhraseLength = 20,
  minPassingTests = 3, // if shorter than phrase, must pass at least 3 of the given tests
  tests = [
    /[a-z]/,
    /[A-Z]/,
    /[0-9]/,
    /[^A-Za-z0-9]/
  ]
}
```

Validation functions are designed to be used alongside an i18n library, so instead of outputing error messages, validations set or unset an `errorKey` on the store (`errorKey: 'Human readable message'` could be used if you don't want to use keys in your view later). If an error key is provided it will be used, otherwise a key will be auto-generated by taking the last element of the statePath and adding one of the following suffix's

* for email and password: `Invalid`
* for required: `Required`
* for equal: `NotEqual`

`errorPath` is the location in the store where the `errorKey` will be set or unset. If not provided then the path will be auto-generated by inserting `validation` as the last but one item in the given statePath.

So for example `validate.email(['signupForm', 'email'])` will call `state.set(['signupForm', 'validation', 'email'], 'emailInvalid')` when the email is invalid or unset the same path when valid.

The password valdation comes with some reasonable defaults, but can easily be customised via an extensive set of options.

`validate.check(statePath)` can be used to assert that all previous validation have passed before proceding with furter actions, `'validation'` will be pushed onto the statePath before running the check, so it works well when following a chain of validation actions.

```js
controller.signal('signinEmailChanged', [
  copyInputToState('value', ['signin', 'email']),
  validate.email(['signin', 'email'])
]);

controller.signal('siginPasswordChanged', [
  copyInputToState('value', ['signin', 'password']),
  validate.required(['signin', 'password'])
]);

controller.signal('signinRequested', [
  validate.email(['signin', 'email']),
  validate.required(['signin', 'password']),
  validate.check('signin'), {
    isValid: [
      copyStateToOutput('signin', 'data'),
      [ajax.post({ url: '/signin'}), {
        success: [
          copyInputToState('user', 'user'),
          redirectToStartPage
        ],
        error: [
          showErrorMessage
        ]
      }]
    ],
    isInvalid: [
      showErrorMessage
    ]
  }
]);

```
