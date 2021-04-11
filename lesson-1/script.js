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
console.log('Ваш месячный доход', money);

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 3,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Например: квартплата, проездной, кредит');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
  }
}

console.log("deposit:", appData.deposit);

let showTypeof = function(item){
  console.log(typeof item);
};
showTypeof(money);
showTypeof(appData.income);
showTypeof(appData.deposit);

let expenses1, expenses2;
let getExpensesMonth = function(){
  let sum = 0;
  let j = 0;
  for(let i = 0; i < 2; i++){
    if(i === 0) {
     expenses1 = prompt('Введите обязательную статью расходов?');
    } else {
     expenses2 = prompt('Введите другую обязательную статью расходов?');
    }
    j = +prompt('Во сколько это обойдется?');
    while(!isNumber(j)){
    j = +prompt('Во сколько это обойдется?');
  }
  sum += j;
  }
    return sum;
};

let expensesMonth = getExpensesMonth();
console.log('Расходы: ' + expensesMonth);
console.log('Расходы: ' + expenses1 + ' и ' + expenses2);

let getAccumulatedMonth = function(){
  return money - expensesMonth;
}
let accumulatedMonth = getAccumulatedMonth();
console.log('Ваш бюджет на месяц: ' + accumulatedMonth);

function getTargetMonth() {
  return Math.ceil(appData.mission / accumulatedMonth);
};

let targetMonth = getTargetMonth();
let a = Math.sign(targetMonth);
if (a === - 1){
  console.log('Цель не будет достигнута.');
} else {
    console.log("Вы сможете достичь цели накопления за: " + targetMonth + " месяцев");
};
