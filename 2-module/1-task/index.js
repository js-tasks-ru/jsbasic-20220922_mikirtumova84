function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {

    if (Number(salaries[key]) && isFinite(salaries[key])) {
      sum += Number(salaries[key]);
    }

  }

  return sum;
}
