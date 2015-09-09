export default function (title) {

  return function setWindowTitle() {
    document.title = title;
  };

}
