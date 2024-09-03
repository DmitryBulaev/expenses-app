const expenses = [];

const expensesInputNode = document.getElementById("expensesInput");
const addExpensesButtonNode = document.getElementById("addExpensesButton");

addExpensesButtonNode.addEventListener("click", function () {
  if (!expensesInputNode.value) {
    return;
  }

  const expense = parseInt(expensesInputNode.value);

  expenses.push(expense);

  expensesInputNode.value = "";

  console.log(expenses);
});
