export default function promiseClick(button) {
  return new Promise((resolve) => {
    button.addEventListener('click', (evt) => {
      resolve(evt);
    });
  });
}
