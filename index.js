const CHANGE_LIMIT_TEXT = "Введите новый лимит";
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

let expenses = [];

const limitInit = () => {
  const limitFromStorage = parseInt(localStorage.getItem("limit"));
  if (!limitFromStorage) {
    return;
  }
  expensesLimitNode.innerText = limitFromStorage;
};

limitInit();

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
  expensesSumNode.innerText = total;

  if (total <= limit) {
    expensesStatusNode.innerText = STATUS_IN_LIMIT;
    expensesStatusNode.className = STATUS_IN_LIMIT_CLASSNAME;
  } else {
    expensesStatusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      limit - total
    } руб.)`;
    expensesStatusNode.className = STATUS_OUT_OF_LIMIT_CLASSNAME;
  }
};

const renderHistory = () => {
  expensesHistoryNode.innerHTML = "";

  expenses.forEach((expense) => {
    const historyItem = document.createElement("li");
    historyItem.className = "rub";
    historyItem.innerText = `${expense.category} - ${expense.amount}`;
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
    alert("Не задана сумма");
    return;
  }

  const currentCategory = getSelectedCategory();
  if (currentCategory === "Категория") {
    alert("Не задана категория");
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

const changeLimitHandler = () => {
  const newLimit = prompt(CHANGE_LIMIT_TEXT);

  const newLimitValue = parseInt(newLimit);

  if (!newLimitValue) {
    return;
  }

  expensesLimitNode.innerText = newLimitValue;

  limit = newLimitValue;
  localStorage.setItem("limit", newLimitValue);

  render();
};

addExpensesButtonNode.addEventListener("click", addButtonHandler);

resetButtonNode.addEventListener("click", resetButtonHandler);

changeLimitButtonNode.addEventListener("click", changeLimitHandler);
