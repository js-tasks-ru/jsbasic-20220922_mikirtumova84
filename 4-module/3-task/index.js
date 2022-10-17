function highlight(table) {
  const tableBodyRows = Array.from(table.querySelector('tbody').rows);

  tableBodyRows.forEach((row, index) => {
    const cells = Array.from(row.cells);

    const cellsWithDataAttr = cells.find(cell => cell.hasAttribute('data-available'));

    if (cellsWithDataAttr && cellsWithDataAttr.getAttribute('data-available')  === 'true') {
      row.classList.add('available');
    } else if (cellsWithDataAttr && cellsWithDataAttr.getAttribute('data-available')  === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }

    if (cells[2].textContent === 'm') {
      row.classList.add('male');
    } else {
      row.classList.add('female');
    }

    if (Number(cells[1].textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }

  });
}
