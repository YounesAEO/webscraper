const startups = JSON.parse(sessionStorage.getItem("scrapedData"));
const config = JSON.parse(sessionStorage.getItem("config"));
console.log(startups);
$(function () {
  //assign log file url to log button
  $("#log").attr(
    "href",
    `http://localhost:5000/api/log/${config.website_name}`
  );

  var cols = Object.keys(startups[0]);

  // Create a table element
  var table = document.createElement("table");

  // Create table row tr element of a table
  var thead = document.createElement("thead");
  table.appendChild(thead);
  var tr = thead.insertRow(-1);

  for (var i = 0; i < cols.length; i++) {
    // Create the table header th element
    var theader = document.createElement("th");
    theader.innerHTML = cols[i];

    // Append columnName to the table row
    tr.appendChild(theader);
  }

  // Adding the data to the table
  var tbody = document.createElement("tbody");
  table.appendChild(tbody);
  for (var i = 0; i < startups.length; i++) {
    // Create a new row
    trow = tbody.insertRow(-1);
    for (var j = 0; j < cols.length; j++) {
      var cell = trow.insertCell(-1);

      // Inserting the cell at particular place
      cell.innerHTML = startups[i][cols[j]];
    }
  }

  // Add the newely created table containing json data
  var el = document.getElementById("table-container");
  el.innerHTML = "";
  el.appendChild(table);
  table.classList.add("table");
  table.classList.add("table-hover");
  table.classList.add("table-dark");
  //$(".table").DataTable();
});

//open modal when clicked on show preview button
$("#preview").on("click", () => {
  $("#classModal").modal("show");
});

//export table to csv when clicked on export csv button
$("#export").on("click", () => {
  $("table").csvExport();
});
