# cerebral-addons [![Build Status](https://secure.travis-ci.org/cerebral/cerebral-addons.png?branch=master)](https://travis-ci.org/cerebral/cerebral-addons)

Additional utilities for use with `cerebral/operators`

## Usage

```js
import and from 'cerebral-addons/and';
import merge from 'cerebral-addons/merge';
```

## Getters/Setters

cerebral-operators supports custom getter and setter functions in place of strings. If either of these
functions is detected to by async (indicated by the returning of a promise) then the addon must be marked
as async in the chain and subsequently define success and error paths.

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
  copy(httpGet('/api/date.json'), 'state:date'), {
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
  copy('state:date', httpPost('/api/date.json')), {
    success: [],
    error: []
  }
]
```

### included getters

cerebral-addons includes the following getters

#### and

```js
export default [
  when(and('state:firstCondition', 'input:otherCondition')), {
    true: [],
    false: []
  }
]
```

#### compose

Compose replaces all getters found in object given to the compose factory with the runtime values

> Compose doesn't currently support async getters

```js
export default [
  copy(compose({
    fromInput: get('input:value'),
    fromState: get('state:value')
  }), 'output:composed')
]
```

#### get

see `compose`

#### isEqual

```js
export default [
  when(isEqual('state:firstValue', 'input:otherValue')), {
    true: [],
    false: []
  }
]
```

#### isDeepEqual

```js
export default [
  when(isDeepEqual('state:firstValue', 'input:otherValue')), {
    true: [],
    false: []
  }
]
```

#### literal

```js
export default [
  copy(literal('literal'), 'output:value')
]
```

#### not

```js
export default [
  when(and('state:firstCondition', not('input:otherCondition'))), {
    true: [],
    false: []
  }
]
```

#### or

```js
export default [
  when(or('state:firstCondition', 'input:otherCondition')), {
    true: [],
    false: []
  }
]
```

#### findWhere

```js
copy(findWhere('state:users', { name: 'John' }), 'output:john')
```

#### pop

> pop also modifies the array in the state

```js
copy(pop('state:users'), 'output:lastUser')
```


#### shift

> shift also modifies the array in the state

```js
copy(shift('state:users'), 'output:firstUser')
```

### Included setters

cerebral-addons includes the following setters

#### merge

```js
copy('input:newData', merge('state:allData'))
```

#### push

```js
copy('input:newUser', push('state:users'))
```

#### unshift

```js
copy('input:newUser', unshift('state:users'))
```

## Note on Adblockers

Some adblockers such as uBlock Origin may block access to `pop.js` during development. This can
be resolved by turning off ad blocking for localhost or using webpack (or similar) for
development. This shouldn't be an issue for production deployments if you are packaging your
production dependencies in a combined `.min.js`.

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es2015 to es5
