export default function onSignalEnd (controller, test) {
  return new Promise(function (resolve, reject) {
    controller.once('signalEnd', function () {
      if (typeof test === 'function') {
        try {
          test()
        } catch (e) {
          return reject(e)
        }
      }
      resolve()
    })
  })
}
