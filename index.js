const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "Всё хорошо";
const STATUS_OUT_OF_LIMIT = "Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const expensesInputNode = document.querySelector('[data-find="expensesInput"]');
const buttonNode = document.getElementById("addedButton");
const expensesHistoryNode = document.querySelector(
  '[data-find="expensesHistory"]'
);
const sumNode = document.querySelector('[data-find="total"]');
const limitNode = document.querySelector('[data-find="limit"]');
const statusNode = document.querySelector('[data-find="status"]');

const expenses = [];

init(expenses);

buttonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();

  if (!expense) {
    return;
  }

  trackExpanse(expense);

  expenses.push(expense);

  renderHistiry(expenses);

  renderSum(expenses);

  renderStatus(expenses);
});

function init(expenses) {
  limitNode.innerText = `${LIMIT} ${CURRENCY}`;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
}

function calculateExpenses(expenses) {
  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
}

function trackExpanse(expense) {
  expenses.push(expense);
}

function getExpenseFromUser() {
  if (!expensesInputNode.value) {
    return null;
  }
  const expense = parseInt(expensesInputNode.value);
  clearInput();
  return expense;
}

function clearInput() {
  expensesInputNode.value = "";
}

function renderHistiry(expenses) {
  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
  });

  expensesHistoryNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(expenses) {
  sumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
}

function renderStatus(expenses) {
  const sum = calculateExpenses(expenses);

  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}
