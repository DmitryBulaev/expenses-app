const expenses = [];

const expensesInputNode = document.querySelector('[data-find="expensesInput"]');
const buttonNode = document.getElementById("addedButton");

buttonNode.addEventListener("click", function () {
  if (!expensesInputNode.value) {
    return;
  }
  const expense = parseInt(expensesInputNode.value);
  expenses.push(expense);

  expensesInputNode.value = "";

  console.log(expenses);
});
