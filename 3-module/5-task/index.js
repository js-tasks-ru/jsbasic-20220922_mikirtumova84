function getMinMax(str) {
  let numbers = str
                .split(' ')
                .filter(item => isFinite(item));

  let result = {
    min: undefined,
    max: undefined,
  };

  result.min = Math.min(...numbers);
  result.max = Math.max(...numbers);

  return result;
}
