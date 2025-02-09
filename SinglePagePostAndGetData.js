function doPost(e) {
  // For testing purposes, simulate the e parameter if it's undefined
  e = e || {
    parameter: {
      action: "submit",
      name: "John Doe",
      age: "25",
      gender: "Male",
    },
  };

  var ss = SpreadsheetApp.openById(
    "1QYXr1Gnpaqk1z3touNBPDSk12Nz9pHnkuZVYvN3Pbhg"
  ); // Replace with your Spreadsheet ID
  var sheet = ss.getSheetByName("Sheet1"); // Ensure the sheet name matches

  // Check if the request is for submission or data retrieval
  if (e.parameter.action === "submit") {
    // Get the data from the form POST
    var name = e.parameter.name;
    var age = e.parameter.age;
    var gender = e.parameter.gender;

    // Append the data to the sheet
    sheet.appendRow([name, age, gender]);

    // Return a success message and the submitted data as JSON
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Data submitted successfully!",
        name: name,
        age: age,
        gender: gender,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else if (e.parameter.action === "fetch") {
    // Fetch all data from the sheet
    var data = sheet.getDataRange().getValues();
    var jsonData = [];

    // Skip the header row if present
    for (var i = 1; i < data.length; i++) {
      jsonData.push({
        name: data[i][0],
        age: data[i][1],
        gender: data[i][2],
      });
    }

    // Return all data as JSON
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        data: jsonData,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // Default response for unknown actions
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "error",
      message: "Unknown action.",
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
