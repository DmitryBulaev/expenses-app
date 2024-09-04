const expenses = [];

const expensesInputNode = document.getElementById("expensesInput");
const addExpensesButtonNode = document.getElementById("addExpensesButton");
const expensesHistoryNode = document.getElementById("expensesHistory");

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
});
