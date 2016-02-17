export default function (value) {
  const literal = function literal () {
    return value
  }

  literal.displayName = `literal(${JSON.stringify(value)})`

  return literal
}
