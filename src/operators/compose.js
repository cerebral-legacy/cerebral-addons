export default function (thing) {
  const compose = function compose (args, src = thing) {
    const newThing = {}
    Object.keys(src).forEach((key) => {
      switch (typeof src[key]) {
        case 'function':
          newThing[key] = src[key](args)
          break
        case 'object':
          newThing[key] = compose(args, src[key])
          break
        default:
          newThing[key] = src[key]
          break
      }
    })
    return newThing
  }

  compose.displayName = 'compose()'

  return compose
}
