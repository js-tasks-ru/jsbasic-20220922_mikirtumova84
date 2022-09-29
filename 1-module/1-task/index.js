function factorial(n) {
  let result = n;

  if (n === 0) {
    result = 1;
  } else {
    for (let i = 1; i < n; i++) {
      result *= (n - i);
    }
  }

  return result;
}
