const LIMIT = 10000;

const expenses = [];

const expensesInputNode = document.getElementById("expensesInput");
const addExpensesButtonNode = document.getElementById("addExpensesButton");
const expensesHistoryNode = document.getElementById("expensesHistory");
const expensesSumNode = document.getElementById("expensesSum");
const expensesLimitNode = document.getElementById("expensesLimit");

expensesLimitNode.innerText = `${LIMIT} руб.`;

addExpensesButtonNode.addEventListener("click", function () {
  if (!expensesInputNode.value) {
    return;
  }

  const expense = parseInt(expensesInputNode.value);

  expensesInputNode.value = "";

  expenses.push(expense);

  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element}  руб.</li>`;
  });

  expensesHistoryNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

  let sum = null;

  expenses.forEach((element) => {
    sum += element;
  });

  expensesSumNode.innerText = `${sum} руб.`;
});
