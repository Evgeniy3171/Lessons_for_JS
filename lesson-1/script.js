'use strict';
let money;

let isNumber = function(n){
 return !isNaN(parseFloat(n)) && isFinite(n) && n != "";
};

let start = function(){
     do {
       money = +prompt('Ваш месячный доход?', 100000);
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
 percentDeposit: 0,
 moneyDeposit: 0,
 asking: function(){
    if (confirm('Есть ли у Вас дополнительный источник дохода?')){
    let itemIncome, cashIncome;
    do {
      itemIncome = prompt('Какой у Вас дополнительный источник дохода?', 'Таксую');
    }
    while (isNumber(itemIncome));
    do {
      cashIncome = prompt('Сколько в месяц Вы на этом получаете?', 10000);
    }
    while (!isNumber(cashIncome));
    appData.income[itemIncome] = cashIncome;
    };

   do {
    appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'квартплата, проездной, кредит');
   }
   while (isNumber(appData.addExpenses));
      appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
   
   appData.deposit = confirm('Есть ли у Вас депозит в банке?');

   let keyExpenses;
   for (let i = 0; i < 2; i++){
     do {
      keyExpenses = prompt('Введите обязательную статью расходов?', 'Продукты');
     }
     while (isNumber(keyExpenses));
     
     appData.expenses[keyExpenses] = prompt('Во сколько это обойдется?', 2000);
     while (!isNumber(appData.expenses[keyExpenses])){
       appData.expenses[keyExpenses] = prompt('Во сколько это обойдется?', 3000);
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
   },
 getInfoDeposit: function(){
   if (appData.deposit){
     do {
      appData.percentDeposit = prompt('Какой процент годовых?', 10);
     }
     while (!isNumber(appData.percentDeposit));

     do {
       appData.moneyDeposit = prompt('Сумма вклада?', 50000);
     }
     while (!isNumber(appData.moneyDeposit));
 }  
 },
 calcSaveMoney: function(){
   return appData.budgetMonth * appData.period;
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
};

for (let i = 0; i < appData.addExpenses.length; i++){
  appData.addExpenses[i] = appData.addExpenses[i].trim();
  appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substr(1);
};
console.log('Ваши возможные расходы: ' + appData.addExpenses.join(', '));
