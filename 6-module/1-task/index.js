/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.renderElem();
  }

  renderElem() {
    const table = document.createElement('table');

    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>`;

    table.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');
    tableBody.innerHTML = this.rows.map(tableRow => `
      <tr>
        <td>${tableRow.name}</td>
        <td>${tableRow.age}</td>
        <td>${tableRow.salary}</td>
        <td>${tableRow.city}</td>
        <td><button type="button">X</button></td>
      </tr>
    `).join('');

    table.appendChild(tableBody);

    this.table = table;

    this.onClick();

    return table;
  }

  onClick() {
    this.table.addEventListener('click', (evt) => {
      if (evt.target.closest('button')) {
        evt.target.closest('tr').remove();
      }
    });
  }
}
