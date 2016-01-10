const regex = /^(\w+):(\/\/([^\/]+))?\/([^\/][^\?]*)(\?(.*))?$/

export default function parseUrl (url) {
  const match = regex.exec(url)
  return !match ? null : {
    scheme: match[1],
    host: match[3],
    path: match[4]
  }
}
