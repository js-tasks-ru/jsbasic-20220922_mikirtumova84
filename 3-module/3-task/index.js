function camelize(str) {
  let firstWord = str
                    .split('-')
                    .slice(0, 1);

  let lastWords = str
                    .split('-')
                    .slice(1)
                    .map(item => item[0].toUpperCase() + item.slice(1))
                    .join('');

  return firstWord + lastWords;
}
