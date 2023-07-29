let expenseAmount = document.getElementById("expenseAmount");
let description = document.getElementById("description");
let category = document.getElementById("category");
let expenseList = document.getElementById("expenseList");


let btn = document.querySelector('button[type="submit"]');
btn.addEventListener("click", function (e) {
  e.preventDefault();

  let myObj = {
    amountValue: expenseAmount.value,
    descriptionValue: description.value,
    categoryValue: category.value,
  };

  localStorage.setItem('myObj', JSON.stringify(myObj));

  let newLi = document.createElement("li");
  newLi.className = "expense-item list-group-item  font-weight-bold  ";
  newLi.textContent = `Expense Amount: ${myObj.amountValue} Description: ${myObj.descriptionValue} Category: ${myObj.categoryValue}`;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "btn btn-danger ml-2 float-right delete";
  deleteBtn.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      if (confirm("Are You Sure")) {
        newLi.remove();
        localStorage.removeItem('myObj');
      }
    }
  });

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "btn btn-primary ml-2 float-right edit";
  editBtn.addEventListener("click", function (e) {
        expenseAmount.value = myObj.amountValue;
        description.value = myObj.descriptionValue;
        category.value = myObj.categoryValue;
        newLi.remove();
        localStorage.removeItem('myObj');
  });

  newLi.appendChild(deleteBtn);
  newLi.appendChild(editBtn);
  expenseList.appendChild(newLi);

  expenseAmount.value = "";
  description.value = "";
  category.value = "";
});



window.addEventListener('load', loadExpenseData);
function loadExpenseData() {
  const storedData = localStorage.getItem('myObj');
 // console.log(storedData)
  if (storedData) {
    const myObj = JSON.parse(storedData);
    const newLi = document.createElement("li");
    newLi.className = "expense-item list-group-item  font-weight-bold  ";
    newLi.textContent = `Expense Amount: ${myObj.amountValue} Description: ${myObj.descriptionValue} Category: ${myObj.categoryValue}`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn btn-danger ml-2 float-right delete";
    deleteBtn.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete")) {
        if (confirm("Are You Sure")) {
          newLi.remove();
          localStorage.removeItem('myObj');
        }
      }
    });

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-primary ml-2 float-right edit";
    editBtn.addEventListener("click", function (e) {
          expenseAmount.value = myObj.amountValue;
          description.value = myObj.descriptionValue;
          category.value = myObj.categoryValue;
          newLi.remove();
          localStorage.removeItem('myObj');
    });

    newLi.appendChild(deleteBtn);
    newLi.appendChild(editBtn);
    expenseList.appendChild(newLi);
  }
}

