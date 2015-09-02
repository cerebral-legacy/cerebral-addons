# cerebral-addons
An actions and factories utility belt for Cerebral

#### logInput
```js
signal('formSubmitted',
  logInput('formData')
);
```

#### resetState
```js
// reset the whole store
signal('signedOut',
  resetState(controller)
);

// in order to reset individual nodes of the store it is first
// necessary to store the initial state during the controller setup
let state = {
  isLoading: false,
  form: {
    initialValue: 1
  }
};
let controller = Controller(Model(state), services);
controller.store.initialState = state;

// then you can reset parts of the store
signal('formResetClicked',
  resetState(controller, 'form')
);
```

#### set
```js
signal('optionsFormOpened',
  set('isLoading', 'true'),
  [getOptionsFromServer, {
    success: [],
    error: []
  }],
  set('isLoading', 'false')
);
```

#### setWindowTitle
```js
signal('optionsFormOpened',
  setWindowTitle('Options - Cerebral App')
);
```

#### timeout (async)
```js
// Run a single action
signal('appMounted',
  timeout(1000, myAction)
);

// Run a chain
signal('appMounted',
  timeout(1000, myActionChain)
);

// Run async parallell
signal('appMounted',
  [
    otherAsyncAction,
    ...timeout(1000, myAction)
  ]
);
```

#### timer
Timer consistes of 4 action factories, they are all async so that they are skipped over by the debugger when replaying signals.

* `timer.start(timerKey, timeout, [onTimeoutActionsArray], [onCancelActionsArray])`
* `timer.pause(timerKey)`
* `timer.restart(timerkey)`
* `timer.cancel(timerkey)`

Simple case:

```js
signal('messageReceived',
  showMessageToUser,
  timer.start('message', 5000),
  hideMessageFromUser
);
```

More complex case:

```js
signal('messageReceived',
  showMessageToUser,
  timer.start('message', 5000, [
    onTimeoutAction
  ], [
    onCancelAction
  ]),
  hideMessageFromUser
);

signal('mouseHoveredOverMessage',
  timer.pause('message')
);

signal('mouseOutMessage',
  timer.restart('message')
);

signal('userDismissedMessage',
  timer.cancel('message')
);
```

#### toggle
```js
// toggle the menu between true and false
signal('menuToggled',
  toggle('menu')
);

// toggle the switch between "On" and "Off"
signale('switchToggled',
  toggle('switch', 'On', 'Off')
);
```
