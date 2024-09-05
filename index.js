const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "Всё хорошо";
const STATUS_OUT_OF_LIMIT = "Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const expensesInputNode = document.getElementById("expensesInput");
const addExpensesButtonNode = document.getElementById("addExpensesButton");
const expensesHistoryNode = document.getElementById("expensesHistory");
const expensesSumNode = document.getElementById("expensesSum");
const expensesLimitNode = document.getElementById("expensesLimit");
const expensesStatusNode = document.getElementById("expensesStatus");

const expenses = [];

init(expenses);

addExpensesButtonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();

  if (!expense) {
    return;
  }

  trackExpense(expense);

  render(expenses);
});

function init(expenses) {
  expensesLimitNode.innerText = `${LIMIT} ${CURRENCY}`;
  expensesSumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
  expensesStatusNode.innerText = STATUS_IN_LIMIT;
}

function trackExpense(expense) {
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

function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element;
  });

  return sum;
}

function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderExpensesHistory(expenses);
  renderExpensesSum(sum);
  renderStatus(expenses);
}

function renderExpensesHistory(expenses) {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element}  ${CURRENCY}</li>`;
  });

  expensesHistoryNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderExpensesSum(sum) {
  expensesSumNode.innerText = `${sum} ${CURRENCY}`;
}

function renderStatus(sum) {
  if (sum <= LIMIT) {
    expensesStatusNode.innerText = STATUS_IN_LIMIT;
  } else {
    expensesStatusNode.innerText = STATUS_OUT_OF_LIMIT;
    expensesStatusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}
