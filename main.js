document.querySelector('button[type="submit"]').addEventListener("click", function (e) {
  e.preventDefault();

  const expenseAmount = document.getElementById("expenseAmount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  fetch('http://localhost:3000/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amountValue: expenseAmount,
      descriptionValue: description,
      categoryValue: category
    })
  })
  .then(response => response.text())
  .then(() => {
    const newLi = document.createElement("li");
    newLi.className = "expense-item list-group-item font-weight-bold";
    newLi.textContent = `Expense Amount: ${expenseAmount} Description: ${description} Category: ${category}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-danger ml-2 float-right delete";
    deleteBtn.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete")) {
        if (confirm("Are You Sure")) {
          fetch('http://localhost:3000/expenses/1', {
            method: 'DELETE'
          })
          .then(() => newLi.remove());
        }
      }
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-primary ml-2 float-right edit";
    editBtn.addEventListener("click", function (e) {
      document.getElementById("expenseAmount").value = expenseAmount;
      document.getElementById("description").value = description;
      document.getElementById("category").value = category;
      newLi.remove();
      // Add logic for updating item in the database if needed
    });

    newLi.appendChild(deleteBtn);
    newLi.appendChild(editBtn);
    document.getElementById("expenseList").appendChild(newLi);

    document.getElementById("expenseAmount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
  });
});

// Load expenses from server
window.addEventListener('load', function() {
  fetch('http://localhost:3000/expenses')
  .then(response => response.json())
  .then(expenses => {
    expenses.forEach(expense => {
      const newLi = document.createElement("li");
      newLi.className = "expense-item list-group-item font-weight-bold";
      newLi.textContent = `Expense Amount: ${expense.amount} Description: ${expense.description} Category: ${expense.category}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "btn btn-danger ml-2 float-right delete";
      deleteBtn.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
          if (confirm("Are You Sure")) {
            fetch(`http://localhost:3000/expenses/${expense.id}`, {
              method: 'DELETE'
            })
            .then(() => newLi.remove());
          }
        }
      });

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "btn btn-primary ml-2 float-right edit";
      editBtn.addEventListener("click", function (e) {
        document.getElementById("expenseAmount").value = expense.amount;
        document.getElementById("description").value = expense.description;
        document.getElementById("category").value = expense.category;
        newLi.remove();
        // Add logic for updating item in the database if needed
      });

      newLi.appendChild(deleteBtn);
      newLi.appendChild(editBtn);
      document.getElementById("expenseList").appendChild(newLi);
    });
  });
});
