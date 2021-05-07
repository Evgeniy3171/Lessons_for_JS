'use strict';

/* Это задание относится к нашему приложению "Budget".
1) Переписать наше приложение в ООП стиле, создать Класс (в старом формате использовать es6 не нужно)
2) Создать новый метод в классе, например eventsListeners.
3) Перенести все действия, которые остались за классом внутрь него.
4) Проверить чтобы все работало без ошибок
5) Добавить папку с уроком на свой GitHub */




//Проверка на число
let isNumber = function(n){
 return !isNaN(parseFloat(n)) && isFinite(n) && n != "";
};

//Получаем элементы страницы
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],    // + Дополнительный доход
    expensesPlus = btnPlus[1],  // + Возможные расходы
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),    // Возможный доход
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],  // Накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),        // Месячный доход
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),   // Возможные расходы
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select'),    // input range
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),   // Возможные расходы
    targetAmount = document.querySelector('.target-amount'),    // Цель накоплений
    incomeItems = document.querySelectorAll('.income-items');   // Дополнительный доход



//создаем класс (калькулятор)
const AppData = function(){
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

//добавляем метод в наш класс
AppData.prototype.start = function(){
    this.budget = +salaryAmount.value;
    //this.getExpenses();
    //this.getIncome();
    //this.getExpensesMonth();
    //this.getAddExpenses();
    //this.getAddIncome();
    this.getBudget();
    this.showResult();
};

//сброс в исходное инпутов
AppData.prototype.reset = function(){
    let inputTextAll = document.querySelectorAll('input');
    inputTextAll.forEach(function(item){
      item.value = '';
    });
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    depositCheck.checked = false;
    depositCheck.disabled = false;
    periodSelect.disabled = false;
};

AppData.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function(){
      return incomePeriodValue.value = appData.calcPeriod();  //!!!!!!!
    });
};

//обработка + для обязательных расходов
const addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].after(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
};

//обработка + для доп. доходов
const addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].after(cloneIncomeItem);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
};

/*     getExpenses: function(){
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
          appData.expenses[itemExpenses] = +cashExpenses;
        }
      });
    };

    getIncome: function(){
      incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== ''){
          appData.income[itemIncome] = +cashIncome;
        }
      });
        for (let key in this.income){
          this.incomeMonth += +this.income[key];
        }
    };

    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
          item = item.trim();
          if (item !== ''){
            appData.addExpenses.push(item);
          }
        });
    };

    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
          let itemValue = item.value.trim();
          if (itemValue !== ''){
            appData.addIncome.push(itemValue);
          }
        });
    };

    getExpensesMonth: function(){
      for (let i in this.expenses){
        appData.expensesMonth += +this.expenses[i];
      }
    };
 */

AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
    let a = Math.sign(this.budgetDay);
    if (a === - 1) {
      console.log('Что-то пошло не так.');
    }
    if (this.budgetDay >= 1200) {
      console.log('У Вас высокий уровень дохода.');
    }
    if (this.budgetDay >=600 && this.budgetDay <1200) {
      console.log('У Вас средний уровень дохода.');
    }
    if (this.budgetDay >= 0 && this.budgetDay < 600) {
      console.log('К сожалению, у Вас доход ниже среднего.');
    }
};

AppData.prototype.getInfoDeposit = function(){
    this.deposit = confirm('Есть ли у Вас депозит в банке?');
    if (this.deposit){
    do {
      this.percentDeposit = prompt('Какой процент годовых?', 10);
    }
    while (!isNumber(this.percentDeposit));

    do {
      this.moneyDeposit = prompt('Сумма вклада?', 50000);
    }
    while (!isNumber(this.moneyDeposit));
    }  
};

AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};


start.disabled = true;
salaryAmount.addEventListener('input', function(){
  if (salaryAmount.value !== ''){
    start.disabled = false;
  } else {
    start.disabled = true;
  }
});

//////////
//start.addEventListener('click', appData.start.bind(appData));
start.addEventListener('click', AppData.prototype.start.bind(this));

/* start.addEventListener('click', function(){
  let inputText = document.querySelectorAll('.data input[type="text"]');
  inputText.forEach(function(item){
    item.disabled = true;
  });
  start.style.display = 'none';
  cancel.style.display = 'block';
  depositCheck.disabled = true;
  //periodSelect.disabled = true;
}); */

//cancel.addEventListener('click', appData.reset.bind(appData));

/* cancel.addEventListener('click', function(){
  let inputText = document.querySelectorAll('.data input[type="text"]');
  inputText.forEach(function(item){
    item.disabled = false;
  });
  start.style.display = 'block';
  cancel.style.display = 'none';
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);

incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(){
  return periodAmount.textContent = periodSelect.value;
});
 */

//const appData = new AppData();

//appData();

