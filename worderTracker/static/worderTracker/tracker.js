updateDate();
notesColor();
updateAllCompleted();

// Delete Nav var Not Used
function deleteNavBar() {
  document.body.removeChild(document.getElementById("nav-bar"));
}

function checkNote(elm) {
  if (elm.value == "HOLD FOR CUSTOMER") {
    elm.className = "bg-danger hold-for-customer";
  } else if (elm.value == "WAITING FOR MATERIAL") {
    elm.className = "waiting-for-material";
  } else if (elm.value == "CUSTOMER WITNESS") {
    elm.className = "customer-witness";
  } else if (elm.value == "OUTSOURCED") {
    elm.className = "alert-secondary";
  } else if (elm.value == "HOLD FOR TA") {
    elm.className = "hold-for-ta";
  } else {
    elm.className = "blank";
  }
}

function notesColor() {
  let notes = document.querySelectorAll(".notes");
  for (i = 0; i < notes.length; i++) {
    if (notes[i].value.toLowerCase() == "none" || notes[i].value.length < 2) {
      notes[i].value = "";
      notes[i].className = "blank";
    } else {
      checkNote(notes[i]);
    }
  }
}

// update due in
function updateDate() {
  let dueDates = document.querySelectorAll(".dueDate");
  let dates = document.querySelectorAll("#due-in");
  for (i = 0; i < dates.length; i++) {
    const targetDate = new Date(dueDates[i].value);
    const currentDate = new Date();
    const dueIn = Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24));
    dates[i].innerHTML = dueIn;
    if (dueIn < 0) {
      dates[i].className = "bg-danger";
      dates[i].style.color = "white";
    } else if (dueIn >= 0 && dueIn <= 7) {
      dates[i].className = "bg-warning";
    } else {
      dates[i].className = "bg-success";
    }
  }
}

// function to write back to server
function POST(data) {
  var csrfToken = $("input[name=csrfmiddlewaretoken]").val();
  let jsonData = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: "/update_data/", // Replace with your server endpoint
    data: jsonData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "X-CSRFToken": csrfToken, // Include the CSRF token in the request headers
    },
    success: function (response) {
      console.log("Data sent successfully:", response);
    },
    error: function (error) {
      alert("COULD NOT SAVE DATA");
    },
  });
}

function updateNotes(elmID, wo) {
  let dataValues = {};
  dataValues["workOrder"] = wo;
  dataValues["field"] = "notes";
  dataValues["data"] = document.getElementById(elmID).value;
  POST(dataValues);
  checkNote(document.getElementById(elmID));
}

function updateShippingThisMonth(wo, value) {
  let dataValues = {};
  dataValues["workOrder"] = wo;
  dataValues["field"] = "stm";
  dataValues["data"] = value;
  POST(dataValues);
}

function writeDate(wo, elmID) {
  let dataValues = {};
  dataValues["workOrder"] = wo;
  dataValues["field"] = "dueDate";
  dataValues["data"] = document.getElementById(elmID).value;
  POST(dataValues);
  updateDate();
}

function updateME(elmID, wo) {
  let dataValues = {};
  dataValues["workOrder"] = wo;
  dataValues["field"] = "ME";
  dataValues["data"] = document.getElementById(elmID).value;
  POST(dataValues);
}

function updateIncomingInspection(wo) {
  let info = document.getElementById(`${wo}-inc`);
  let dataValues = {};
  dataValues["workOrder"] = wo;
  dataValues["field"] = "inspection";

  if (info.innerText == "Incoming Inspection") {
    info.innerText = "";
    info.className = "bg-success";
    dataValues["data"] = "false";
  } else {
    info.innerText = "Incoming Inspection";
    info.className = "bg-warning";
    dataValues["data"] = "true";
  }
  POST(dataValues);
}

function convertAndSend() {
  var tableData = [];
  var headers = [];

  // Get table headers
  $("#data-table th").each(function () {
    headers.push($(this).text());
  });

  // Iterate over table rows
  $("#data-table tbody tr").each(function () {
    var rowData = {};
    var currentRow = $(this);

    // Iterate over each cell in the row
    currentRow.find("td").each(function (index) {
      rowData[headers[index]] = $(this).text();
    });

    tableData.push(rowData);
  });

  // Convert data to JSON
  var jsonData = JSON.stringify(tableData);

  // Send data to the server using AJAX
  $.ajax({
    type: "POST",
    url: "/update_data/", // Replace with your server endpoint
    data: jsonData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (response) {
      console.log("Data sent successfully:", response);
    },
    error: function (error) {
      alert("COULD NOT SAVE DATA");
    },
  });
}

function updateStatus(wo, op) {
  let cell = document.getElementById(`${wo}-${op}`);
  let dataValues = {};
  let statusLabel = document.getElementById(`${wo}-completed`);

  dataValues["workOrder"] = wo;
  dataValues["field"] = "operation";
  dataValues["op"] = op;
  if (cell.className == "pending") {
    let compltedHours =
      parseFloat(statusLabel.ariaPlaceholder) +
      parseFloat(cell.ariaPlaceholder);
    statusLabel.ariaPlaceholder = compltedHours;
    cell.className = "completed";
    dataValues["data"] = "completed";
    dataValues["comp"] = compltedHours;
  } else {
    cell.className = "pending";
    let compltedHours =
      parseFloat(statusLabel.ariaPlaceholder) -
      parseFloat(cell.ariaPlaceholder);
    statusLabel.ariaPlaceholder = compltedHours;
    dataValues["data"] = "pending";
    dataValues["comp"] = compltedHours;
  }

  POST(dataValues);
  updateCompleted(`${wo}-completed`);
}

function updateAllCompleted() {
  nodes = document.querySelectorAll(".comp-per");
  for (i = 0; i < nodes.length; i++) {
    updateCompleted(nodes[i].id);
  }
}

function updateCompleted(id) {
  let textBox = document.getElementById(id);
  textBox.innerText =
    Math.round(
      (parseFloat(textBox.ariaPlaceholder) / parseFloat(textBox.ariaLabel)) *
        100
    ) + "%";
}

function removeButton() {
  return button;
}

let MACHINELIST = [];

function modal(wo, op) {
  let modal = document.createElement("div");
  modal.style.zIndex = "100";

  modal.id = "modal";
  modal.style.top = "25%";
  modal.style.left = "37.5%";
  modal.className = "pop-up-window h-50 w-25 position-absolute";

  modal.innerHTML = `<div class="card">
  <div class="d-flex justify-content-between border-bottom align-items-center">
    <span class="mx-2">Editing ${wo}, Step Number:${op}</span>
    <button type="button" class="btn btn-danger" onclick="removeModal()" style="scale:.75">X</button>
  </div>
  <div class="card-body">
    <p class="card-text fs-4"><pre>${
      document.getElementById(`${wo}-${op}`).title
    }</pre></p>
    <a href="#" class="btn btn-primary mt-5">Save Changes</a>
  </div>
</div>`;

  document.body.appendChild(modal);
  // alert(x);
  // fetchMachineList;
}

function fetchMachineList() {
  // Send a GET request to the server to retrieve JSON data
  fetch("/get_machine_list/") // Update this URL to match your Django URL pattern
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received data:", data["list"]);

      return;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function removeModal() {
  document.body.removeChild(document.getElementById("modal"));
}
