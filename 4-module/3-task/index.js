function highlight(table) {
  const tableBodyRows = table.querySelector('tbody').rows;

  for (let i = 0; i < tableBodyRows.length; i++) {
    let noDataAttribute = [];

    for (cell of tableBodyRows[i].cells) {

      if (cell.getAttribute('data-available') === 'true') {
        tableBodyRows[i].classList.add('available');
      } else if (cell.getAttribute('data-available') === 'false') {
        tableBodyRows[i].classList.add('unavailable');
      }

      if (!cell.hasAttribute('data-available')) {
        noDataAttribute.push(false);
      }

    }

    if (noDataAttribute.length === tableBodyRows[i].cells.length) {
      tableBodyRows[i].hidden = true;
    }

    if (tableBodyRows[i].cells[2].textContent === 'm') {
      tableBodyRows[i].classList.add('male');
    } else {
      tableBodyRows[i].classList.add('female');
    }

    if (Number(tableBodyRows[i].cells[1].textContent) < 18) {
      tableBodyRows[i].style.textDecoration = 'line-through';
    }

  }
}
