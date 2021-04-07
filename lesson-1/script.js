'use strict';
let money,
    income,
    addExpenses,
    deposit,
    mission,
    period;
mission = 1000000;
period = 12;
money = +prompt('Ваш месячный доход');
console.log('Ваш месячный доход', money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Например: квартплата, проездной, кредит');
console.log("Ваши возможные расходы за рассчитываемый период: ", addExpenses);
deposit = confirm('Есть ли у Вас депозит в банке?');
console.log("deposit:", deposit);
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
/* let budgetMonth = money - amount1 - amount2;
console.log("Ваш месячный бюджет:", budgetMonth);
let result = Math.ceil(mission / budgetMonth);
console.log("Вы сможете накопить ", mission, "за ", result, "месяцев");
let budgetDay = Math.floor(budgetMonth / 30);
console.log('Ваш бюджет на день: ', budgetDay);
let a = Math.sign(budgetDay);
if (a === - 1) {
  console.log('Что-то пошло не так.');
}
if (budgetDay >= 1200) {
  console.log('У Вас высокий уровень дохода.');
}
if (budgetDay < 1200) {
  if (budgetDay >= 600) {
  console.log('У Вас средний уровень дохода.');
}}
if (budgetDay < 600) {
  if (budgetDay >= 0) {
  console.log('К сожалению, у Вас доход ниже среднего.');
}} */

function getExpensesMonth() {
  return amount1 + amount2;
}
function getAccumulatedMonth() {
  return money - amount1 - amount2;
}
let accumulatedMonth = getAccumulatedMonth();
function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}
function showTypeOf(data) {
  console.log(typeof(data));
}
showTypeOf(money);
showTypeOf(addExpenses);
showTypeOf(mission);
showTypeOf(period);
console.log("Расходы за месяц составят: ", getExpensesMonth());
console.log("Ваш бюджет на месяц составит: ", getAccumulatedMonth());
console.log("Вы сможете достичь цели накопления за: ", getTargetMonth(), "месяцев");
let budgetDay = Math.floor(getAccumulatedMonth() / 30);
console.log('Ваш бюджет на день: ', budgetDay);
let a = Math.sign(budgetDay);
function getStatusIncome() {
  if (a === - 1) {
    console.log('Что-то пошло не так.');
  }
  if (budgetDay >= 1200) {
    console.log('У Вас высокий уровень дохода.');
  }
  if (budgetDay >=600 && budgetDay <1200) {
    console.log('У Вас средний уровень дохода.');
  }
  if (budgetDay >= 0 && budgetDay < 600) {
   console.log('К сожалению, у Вас доход ниже среднего.');
  }
}
getStatusIncome()
