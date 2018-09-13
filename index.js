$(document).ready(function () {
  getTRSHDATA();
});

let displayResources = $('#main');


function getTRSHDATA() {
  $.ajax({
    method: 'GET',
    url: 'https://jkq0dchnp0.execute-api.eu-west-1.amazonaws.com/dev/get-json-data',
    dataType: 'json',
    success: onSuccess,
    error: onError
  })
}

function onSuccess(productData) {
  var output = "<table><thead><tr><th>Title</th><th>Description</th><th>Vendor</th><th>Type</th></thead><tbody>";
  for (let i = 0; i < productData.products.length; i++) {
    output += "<tr><td>" + productData.products[i].title + "</td><td>" + productData.products[i].body_html + "</td><td>" + productData.products[i].vendor + "</td><td>" + productData.products[i].product_type + "</td></tr>";
  }
  output += "</tbody></table>";

  displayResources.html(output);
  $("table").addClass("table");

  $('th').click(function () {
    let table = $(this).parents('table').eq(0)
    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.ascending = !this.ascending
    if (!this.ascending) { rows = rows.reverse() }
    for (let i = 0; i < rows.length; i++) { table.append(rows[i]) }
  })
  function comparer(index) {
    return function (a, b) {
      let valA = getCellValue(a, index), valB = getCellValue(b, index)
      return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
  }
  function getCellValue(row, index) { return $(row).children('td').eq(index).text() }
}


function onError() {
  $('#main').html('i failed.');
}