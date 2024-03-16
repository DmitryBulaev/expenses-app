const expenses = [];

const expensesInputNode = document.querySelector('[data-find="expensesInput"]');
const buttonNode = document.getElementById("addedButton");

buttonNode.addEventListener("click", function () {
  const expense = parseInt(expensesInputNode.value);
  expenses.push(expense);

  console.log(expenses);
});
