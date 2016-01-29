export default function (path, getter) {
  return typeof path === 'function'
    ? getter.displayName || getter.name
    : JSON.stringify(path)
}
