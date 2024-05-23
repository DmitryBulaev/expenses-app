const LIMIT = 10000;
const STATUS_IN_LIMIT = "всё хорошо";
const STATUS_OUT_OF_LIMIT = "всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const expensesInputNode = document.getElementById("expensesInput");
const addedButtonNode = document.getElementById("addButton");
const resetButtonNode = document.getElementById("clearButton");
const expensesHistoryNode = document.getElementById("historyList");
const sumNode = document.getElementById("totalValue");
const limitNode = document.getElementById("limitValue");
const statusNode = document.getElementById("statusText");

let expenses = [];

init(expenses);

addedButtonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();

  if (!expense) {
    return;
  }

  trackExpanse(expense);

  render(expenses);
});

function init(expenses) {
  limitNode.innerText = LIMIT;
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

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderHistiry(expenses);
  renderStatus(sum);
}

function renderHistiry(expenses) {
  expensesHistoryNode.innerHTML = "";
  expenses.forEach((element) => {
    const expensesElement = document.createElement("li");
    expensesElement.className = "rub";
    expensesElement.innerText = element;

    expensesHistoryNode.appendChild(expensesElement);
  });
}

function renderStatus(sum) {
  sumNode.innerText = sum;
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} руб)`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

resetButtonNode.addEventListener("click", function () {
  expenses = [];
  render(expenses);
  statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
});
