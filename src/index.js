

var rIndex,
  table = document.getElementById("table");
const add = document.getElementById("add");
const edit = document.getElementById("edit");

var list = [];
console.log(list);
function renderlist() {
  var rowCount = table.rows.length;
for (var x=rowCount-1; x>0; x--) {
   table.deleteRow(x);
}
  for (var i = localStorage.length-1; i >=0; i--) {
    const key = localStorage.key(i);
    if (key == "running" || key == "__test__") {
      continue;
    }
    const value = localStorage.getItem(key);
    var val = parseInt(value);

    var newRow = table.insertRow(table.length),
      ItemCell = newRow.insertCell(0),
      QuantityCell = newRow.insertCell(1),
      EditCell = newRow.insertCell(2),
      DeleteCell = newRow.insertCell(3),
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
    ItemCell.innerHTML = key;

    QuantityCell.innerHTML = val;
    EditCell.innerHTML = edit;
    DeleteCell.innerHTML = del;
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
  } else if (parseInt(qty) <= 0) {
    alert("Quantity has to be positive");
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
    localStorage.setItem(item,upadte.toString());
    //table.rows[finditem[2]].cells[1].innerHTML = upadte;
    renderlist();
  } else {
    if (!checkEmptyInput()) {
     
      list.push([item, quantity, table.rows.length - 1]);
      localStorage.setItem(item, quantity.toString());
      // call the function to set the event to the new row
       renderlist();
      
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
      
      var n = list.length;
      for (var i = 0; i < n; i++) {
        if (list[i][0] == item) {
          list[i][1] = qty;
        }
      }
      localStorage.setItem(item, qty.toString());
      renderlist();
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
