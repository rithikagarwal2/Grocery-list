
var rIndex,
  table = document.getElementById("table");
const add = document.getElementById("add");
const edit = document.getElementById("edit");

var list = [];
console.log(list);
function renderlist() {
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key == "running" || key == "__test__") {
      continue;
    }
    const value = localStorage.getItem(key);
    var val = parseInt(value);

    var newRow = table.insertRow(table.length),
      cell1 = newRow.insertCell(0),
      cell2 = newRow.insertCell(1),
      cell3 = newRow.insertCell(2),
      cell4 = newRow.insertCell(3),
      edit = `<button style=" background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 16px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        background-color:rgb(9, 129, 241);
        border-radius:5px;">Edit</button>`,
      del = `<button style=" background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        background-color:black;
        border-radius:5px;">Delete</button>`;
    cell1.innerHTML = key;

    cell2.innerHTML = val;
    cell3.innerHTML = edit;
    cell4.innerHTML = del;
    list.push([key, value, table.rows.length - 1]);

    // call the function to set the event to the new row

    selectedRowToInput();
  }
}
renderlist();

add.addEventListener("click", addHtmlTableRow);
edit.addEventListener("click", editHtmlTbleSelectedRow);

selectedRowToInput();
function checkEmptyInput() {
  var isEmpty = false,
    item = document.getElementById("item").value,
    qty = document.getElementById("qty").value;

  if (item === "") {
    alert("Item Connot Be Empty");
    isEmpty = true;
  } else if (qty === "") {
    alert("Quantity Connot Be Empty");
    isEmpty = true;
  } else if (parseInt(qty) < 0) {
    alert("Quantity Connot Be Negative");
    isEmpty = true;
  }
  return isEmpty;
}

// add Row
function addHtmlTableRow() {
  // get the table by id
  // create a new row and cells
  // get value from input text
  // set the values into row cell's
  var item = document.getElementById("item").value;
  var quantity = document.getElementById("qty").value;
  var finditem = list.find((element) => {
    return element[0] == item;
  });
  var index, value;
  if (finditem != undefined) {
    var upadte = parseInt(quantity) + parseInt(finditem[1]);

    console.log(finditem[1]);
    console.log(finditem[2]);
    var n = list.length;
    for (var i = 0; i < n; i++) {
      if (list[i][0] == item) {
        list[i][1] = upadte;
      }
    }
    table.rows[finditem[2]].cells[1].innerHTML = upadte;
  } else {
    if (!checkEmptyInput()) {
      var newRow = table.insertRow(table.length),
        cell1 = newRow.insertCell(0),
        cell2 = newRow.insertCell(1),
        cell3 = newRow.insertCell(2),
        cell4 = newRow.insertCell(3),
        edit = `<button style=" background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 16px 30px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        background-color:rgb(9, 129, 241);
        border-radius:5px;">Edit</button>`,
        del = `<button style=" background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        background-color:black;
        border-radius:5px;">Delete</button>`;
      cell1.innerHTML = item;

      cell2.innerHTML = quantity;
      cell3.innerHTML = edit;
      cell4.innerHTML = del;
      list.push([item, quantity, table.rows.length - 1]);
      localStorage.setItem(item, quantity.toString());
      // call the function to set the event to the new row

      selectedRowToInput();
    }
  }
}

// display selected row data into input text

function selectedRowToInput() {
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      // get the seected row index
      rIndex = this.rowIndex;
      console.log(rIndex);
      document.getElementById("item").value = this.cells[0].innerHTML;

      document.getElementById("qty").value = this.cells[1].innerHTML;
    };
    table.rows[i].cells[3].onclick = function () {
      rIndex = this.parentElement.rowIndex;

      removeSelectedRow();
    };
  }
}
selectedRowToInput();

function editHtmlTbleSelectedRow() {
  selectedRowToInput();
  var item = document.getElementById("item").value,
    qty = document.getElementById("qty").value;
  if (!checkEmptyInput()) {
    if (table.rows[rIndex] == undefined) {
      alert("please click on edit button to edit");
    }
    if (table.rows[rIndex] != undefined) {
      table.rows[rIndex].cells[0].innerHTML = item;

      table.rows[rIndex].cells[1].innerHTML = qty;
      table.rows[
        rIndex
      ].cells[2].innerHTML = `<button style=" background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 16px 30px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      background-color:rgb(9, 129, 241);
      border-radius:5px;">Edit</button>`;
      table.rows[
        rIndex
      ].cells[3].innerHTML = `<button style="background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 25px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      background-color:black;
      border-radius:5px;">Delete</button>`;
      var n = list.length;
      for (var i = 0; i < n; i++) {
        if (list[i][0] == item) {
          list[i][1] = qty;
        }
      }
      localStorage.setItem(item, qty.toString());
    }
  }
}

function removeSelectedRow() {
  var item1 = table.rows[rIndex].cells[0].innerHTML;
  localStorage.removeItem(item1);
  list = list.filter((element) => {
    return item1 != element[0];
  });
  table.deleteRow(rIndex);
  console.log(rIndex);
  document.getElementById("item").value = "";

  document.getElementById("qty").value = "";
}
