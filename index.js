const CHANGE_LIMIT_TEXT = "Введите новый лимит";
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = "Всё хорошо";
const STATUS_OUT_OF_LIMIT = "Всё плохо";
const STATUS_IN_LIMIT_CLASSNAME = "status_green";
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

const getExpenseFromUser = () => {
  return parseInt(expensesInputNode.value);
};

const getSelectedCategory = () => {
  return categorySelectNode.value;
};

const getTotal = () => {
  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;
  });

  return total;
};

const renderStatus = () => {
  const total = getTotal(expenses);
  expensesSumNode.innerText = `${total} ${CURRENCY}`;

  if (total <= limit) {
    expensesStatusNode.innerText = STATUS_IN_LIMIT;
    expensesStatusNode.className = STATUS_IN_LIMIT_CLASSNAME;
  } else {
    expensesStatusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      limit - total
    } руб)`;
    expensesStatusNode.className = STATUS_OUT_OF_LIMIT_CLASSNAME;
  }
};

const renderHistory = () => {
  expensesHistoryNode.innerHTML = "";

  expenses.forEach((expense) => {
    const historyItem = document.createElement("li");
    historyItem.innerText = `${expense.category} - ${expense.amount} ${CURRENCY}`;
    expensesHistoryNode.appendChild(historyItem);
  });
};

const render = () => {
  renderStatus();
  renderHistory();
};

const clearInput = (input) => {
  input.value = "";
};

const addButtonHandler = () => {
  const currentAmount = getExpenseFromUser();
  if (!currentAmount) {
    return;
  }

  const currentCategory = getSelectedCategory();
  if (currentCategory === "Категория") {
    return;
  }

  const expense = { amount: currentAmount, category: currentCategory };

  expenses.push(expense);

  render();

  clearInput(expensesInputNode);
};

const resetButtonHandler = () => {
  expenses = [];
  render();
};

addExpensesButtonNode.addEventListener("click", addButtonHandler);

resetButtonNode.addEventListener("click", resetButtonHandler);

// changeLimitButtonNode.addEventListener("click", changeLimitHandler);
