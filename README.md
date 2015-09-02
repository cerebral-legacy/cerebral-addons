# cerebral-addons
An actions and factories utility belt for Cerebral

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
