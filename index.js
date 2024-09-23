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
// expensesLimitNode.innerText = localStorage.getItem("limit");

let expenses = [];

const getTotal = () => {
  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;
  });

  return total;
};

const renderStatus = () => {
  if (total <= limit) {
    expensesStatusNode.innerText = STATUS_IN_LIMIT;
  } else {
    expensesStatusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      limit - total
    } руб)`;
    expensesStatusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
};

function clearInput(input) {
  input.value = "";
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

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderExpensesHistory(expenses);
  renderExpensesSum(sum);
  renderStatus(sum);
}

addExpensesButtonNode.addEventListener("click", addButtonHandler);

resetButtonNode.addEventListener("click", resetButtonHandler);

changeLimitButtonNode.addEventListener("click", changeLimitHandler);
