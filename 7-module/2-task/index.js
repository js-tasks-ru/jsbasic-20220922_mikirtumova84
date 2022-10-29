import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.bodyDocument = document.querySelector('body');
    this.container = document.querySelector('.container');
    this.renderModal();
  }

  close() {
    this.modalElem.remove();
    this.bodyDocument.classList.remove('is-modal-open');

    document.removeEventListener('keydown', this.closeEsc);
  }

  setTitle(text) {
    const titleElem = this.modalElem.querySelector('.modal__title');
    titleElem.textContent = text;
  }

  setBody(node) {
    const bodyModalElem = this.modalElem.querySelector('.modal__body');
    bodyModalElem.appendChild(node);
  }

  open() {
    this.bodyDocument.classList.add('is-modal-open');
  }

  renderModal() {
    const modalElem = document.createElement('div');
    modalElem.classList.add('modal');

    this.modalElem = modalElem;

    const modalOverlay = createElement(`
      <div class="modal__overlay"></div>
    `);

    modalElem.appendChild(modalOverlay);

    const modalContent = createElement(`
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `);

    modalElem.appendChild(modalContent);

    this.bodyDocument.append(modalElem);

    this.onButtonClick();
    this.onDocumentEsc();
  }

  onButtonClick() {
    const button = this.modalElem.querySelector('.modal__close');

    button.addEventListener('click', () => {
      this.close();
    });
  }

  closeEsc = (evt) => {
    if (evt.code === 'Escape') {
      this.close();
    }
  }

  onDocumentEsc() {
    document.addEventListener('keydown', this.closeEsc);
  }
}
