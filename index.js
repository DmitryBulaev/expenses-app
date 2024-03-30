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
  if (!expensesInputNode.value) {
    return;
  }
  const expense = parseInt(expensesInputNode.value);
  expensesInputNode.value = "";
  expenses.push(expense);

  renderHistiry(expenses);

  sumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;

  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
});

function init(expenses) {
  limitNode.innerText = `${LIMIT} ${CURRENCY}`;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumNode.innerText = calculateExpenses(expenses);
}

function calculateExpenses(expenses) {
  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
}

function renderHistiry(expenses) {
  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
  });

  expensesHistoryNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}
