const CHANGE_LIMIT_TEXT = "Введите новый лимит";
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "Всё хорошо";
const STATUS_OUT_OF_LIMIT = "Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const expensesInputNode = document.getElementById("expensesInput");
const categorySelectNode = document.getElementById("categorySelect");
const addExpensesButtonNode = document.getElementById("addExpensesButton");
const expensesHistoryNode = document.getElementById("expensesHistory");
const expensesSumNode = document.getElementById("expensesSum");
const expensesLimitNode = document.getElementById("expensesLimit");
const expensesStatusNode = document.getElementById("expensesStatus");
const resetButtonNode = document.getElementById("resetButton");
const changeLimitButtonNode = document.getElementById("changeLimitBtn");

let limit = parseInt(expensesLimitNode.innerText);
let expenses = [];

init(expenses);

addExpensesButtonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();

  if (!expense) {
    return;
  }

  const category = getSelectedCategory();

  if (category === "Категория") {
    return;
  }

  trackExpense(expense);

  render(expenses);
});

resetButtonNode.addEventListener("click", function () {
  removeHistory();
  resetSum();
  resetStatus();
});

changeLimitButtonNode.addEventListener("click", function () {
  const newLimit = prompt(CHANGE_LIMIT_TEXT);

  const newLimitValue = parseInt(newLimit);

  if (!newLimitValue) {
    return;
  }

  expensesLimitNode.innerText = newLimitValue;

  limit = newLimitValue;

  render();
});

function init(expenses) {
  expensesLimitNode.innerText = `${limit} ${CURRENCY}`;
  expensesSumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
  expensesStatusNode.innerText = STATUS_IN_LIMIT;
}

const getSelectedCategory = () => {
  return categorySelectNode.value;
};

const getExpenseValue = () => {
  return parseInt(expensesInputNode.value);
};

function getExpenseFromUser() {
  if (!expensesInputNode.value) {
    return null;
  }

  const currentCategory = getSelectedCategory();

  const expenseValue = getExpenseValue();

  const expense = {
    amount: expenseValue,
    category: currentCategory,
  };

  clearInput();

  return expense;
}

function trackExpense(expense) {
  expenses.push(expense);
}

function clearInput() {
  expensesInputNode.value = "";
}

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element.amount;
  });

  return sum;
}

function renderExpensesHistory(expenses) {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element.category} - ${element.amount}  ${CURRENCY}</li>`;
  });

  expensesHistoryNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderExpensesSum(sum) {
  expensesSumNode.innerText = `${sum} ${CURRENCY}`;
}

function renderStatus(sum) {
  if (sum <= limit) {
    expensesStatusNode.innerText = STATUS_IN_LIMIT;
  } else {
    expensesStatusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      limit - sum
    } руб)`;
    expensesStatusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderExpensesHistory(expenses);
  renderExpensesSum(sum);
  renderStatus(sum);
}

function removeHistory() {
  expenses = [];
  expensesHistoryNode.innerHTML = "";
}

function resetSum() {
  const sum = 0;
  expensesSumNode.innerText = `${sum} ${CURRENCY}`;
}

function resetStatus() {
  expensesStatusNode.innerText = STATUS_IN_LIMIT;
  expensesStatusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
}
