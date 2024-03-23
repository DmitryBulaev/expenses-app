const expenses = [];

const LIMIT = 10000;

const expensesInputNode = document.querySelector('[data-find="expensesInput"]');
const buttonNode = document.getElementById("addedButton");
const expensesHistoryNode = document.querySelector(
  '[data-find="expensesHistory"]'
);
const sumNode = document.querySelector('[data-find="total"]');
const limitNode = document.querySelector('[data-find="limit"]');
const statusNode = document.querySelector('[data-find="status"]');

limitNode.innerText = `${LIMIT} руб.`;

buttonNode.addEventListener("click", function () {
  if (!expensesInputNode.value) {
    S;
    return;
  }
  const expense = parseInt(expensesInputNode.value);
  expensesInputNode.value = "";
  expenses.push(expense);

  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} руб.</li>`;
  });

  expensesHistoryNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });

  sumNode.innerText = `${sum} руб.`;

  if (sum <= LIMIT) {
    statusNode.innerText = "Всё хорошо";
  } else {
    statusNode.innerText = "Всё плохо";
  }
});
