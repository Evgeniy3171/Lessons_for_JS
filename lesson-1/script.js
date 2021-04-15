'use strict';

let isNumber = function(n){
 return !isNaN(parseFloat(n)) && isFinite(n) && n != "";
};

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    //budgetDayValue = getElementsByClassName('budget_day-value')[0],
    //budgetMonthValue = getElementsByClassName('budget_month-value')[0],
    //expensesMonthValue = getElementsByClassName('expenses_month-value')[0],
    //accumulatedMonthValue = getElementsByClassName('accumulated_month-value')[0],
    //additionalIncomeValue = getElementsByClassName('additional_income-value')[0],
    //additionalExpensesValue = getElementsByClassName('additional_expenses-value')[0],
    //incomePeriodValue = getElementsByClassName('income_period-value')[0],
    //targetMonthValue = getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select');

let appData = {
 budget: 0,
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
 start: function(){
    if (salaryAmount.value === ''){
      alert('Ошибка, поле "Месчный доход" должно быть заполнено!');
      return;
    }
    appData.budget = salaryAmount.value;
    console.log(salaryAmount.value);
    /* appData.asking();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getTargetMonth(); */
 },
 addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
 },
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

start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);

/* let a = Math.sign(appData.period);
if (a === - 1){
  console.log('Цель не будет достигнута.');
} else {
   console.log("Вы сможете достичь цели накопления за: " + appData.period + " месяцев");
}; */

//appData.getStatusIncome();

/* console.log('Наша программа включает в себя данные: ');
for (let key in appData){
 console.log('Ключ: ' + '"' + key + '"' + ' имеет значение: ' + appData[key]);
};

for (let i = 0; i < appData.addExpenses.length; i++){
  appData.addExpenses[i] = appData.addExpenses[i].trim();
  appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substr(1);
};
console.log('Ваши возможные расходы: ' + appData.addExpenses.join(', ')); */

// 08.36