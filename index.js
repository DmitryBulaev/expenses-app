const expenses = [2];

const expensesInputNode = document.getElementById("expensesInput");
const addExpensesButtonNode = document.getElementById("addExpensesButton");

addExpensesButtonNode.addEventListener("click", function () {
  let expense = expensesInputNode.value;

  expenses.push(expense);

  console.log(expenses);
});
