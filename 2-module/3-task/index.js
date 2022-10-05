let calculator = {
  num1: undefined,
  num2: undefined,
  read(a, b) {
    this.num1 = Number(a);
    this.num2 = Number(b);
  },
  sum() {
    return this.num1 + this.num2;
  },
  mul() {
    return this.num1 * this.num2;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
