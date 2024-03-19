const expenses = [];

const expensesInputNode = document.querySelector('[data-find="expensesInput"]');
const buttonNode = document.getElementById("addedButton");
const expensesHistoryNode = document.querySelector(
  '[data-find="expensesHistory"]'
);

buttonNode.addEventListener("click", function () {
  if (!expensesInputNode.value) {
    return;
  }
  const expense = parseInt(expensesInputNode.value);
  expensesInputNode.value = "";
  expenses.push(expense);

  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element}</li>`;
  });

  expensesHistoryNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
});
