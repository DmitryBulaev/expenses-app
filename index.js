const expenses = [];

const expensesInputNode = document.querySelector('[data-find="expensesInput"]');
const buttonNode = document.getElementById("addedButton");
const expensesHistoryNode = document.querySelector(
  '[data-find="expensesHistory"]'
);
const sumNode = document.querySelector('[data-find="total"]');

buttonNode.addEventListener("click", function () {
  if (!expensesInputNode.value) {
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

  sumNode.innerText = sum;
});
