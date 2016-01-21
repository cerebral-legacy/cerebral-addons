export default function isTruthy (value) {
  if (value && typeof value === 'object' && Object.keys(value).length === 0) {
    return false
  } else {
    return !!value
  }
}
