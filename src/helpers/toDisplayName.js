export default function (path, getter) {
  return typeof path === 'function'
    ? getter.displayName
    : JSON.stringify(path)
}
