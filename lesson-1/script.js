'use strict';
let money;

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n) && n != "";
};

let start = function(){
      do {
        money = +prompt('Ваш месячный доход?');
      }
      while(!isNumber(money));
      /*money = +prompt('Ваш месячный доход?');
      while(!isNumber(money)){
        money = +prompt('Ваш месячный доход?');
      }*/
};

start();

let appData = {
  budget: money,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Например: квартплата, проездной, кредит');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
    for (let i = 0; i < 2; i++){
      let keyExpenses = prompt('Введите обязательную статью расходов?');
      appData.expenses[keyExpenses] = prompt('Во сколько это обойдется?');
      while (!isNumber(appData.expenses[keyExpenses])){
        appData.expenses[keyExpenses] = prompt('Во сколько это обойдется?');
      }
    }
    },
  getExpensesMonth: function(){
    for (let i in appData.expenses){
      appData.expensesMonth += +appData.expenses[i];
    }
    },
  getBudget: function(){
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
  getTargetMonth: function () {
      appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    },
  getStatusIncome: function () {
      let a = Math.sign(appData.budgetDay);
      if (a === - 1) {
        console.log('Что-то пошло не так.');
      }
      if (appData.budgetDay >= 1200) {
        console.log('У Вас высокий уровень дохода.');
      }
      if (appData.budgetDay >=600 && appData.budgetDay <1200) {
        console.log('У Вас средний уровень дохода.');
      }
      if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
       console.log('К сожалению, у Вас доход ниже среднего.');
      }
    }
};

appData.asking();

appData.getExpensesMonth();
console.log('Расходы за месяц: ' + appData.expensesMonth);

appData.getBudget();

appData.getTargetMonth();
let a = Math.sign(appData.period);
if (a === - 1){
  console.log('Цель не будет достигнута.');
} else {
    console.log("Вы сможете достичь цели накопления за: " + appData.period + " месяцев");
};

appData.getStatusIncome();

console.log('Наша программа включает в себя данные: ');
for (let key in appData){
  console.log('Ключ: ' + '"' + key + '"' + ' имеет значение: ' + appData[key]);
}