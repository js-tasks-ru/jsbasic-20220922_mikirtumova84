function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const text = document.querySelector('#text');

  if (button && text) {
    button.addEventListener('click', () => {
      if (text.hasAttribute('hidden')) {
        text.hidden = false;
      } else {
        text.hidden = true;
      }
    });
  }
}
