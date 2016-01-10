export function getPathValue (obj, path) {
  let value
  if (obj && path) {
    if (Array.isArray(path)) {
      value = obj
      path.forEach(key => {
        if (value) {
          value = value[key]
        }
      })
    } else {
      value = obj[path]
    }
  }
  return value
}

export function setPathValue (obj, path, value) {
  if (obj && path) {
    if (Array.isArray(path)) {
      let node = obj
      path.forEach((key, index) => {
        node = node[key] = index + 1 < path.length ? node[key] || {} : value
      })
    } else {
      obj[path] = value
    }
  }
}
