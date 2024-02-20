
function listNamesWithDetails() {
    // Get the active spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
    // Create a new spreadsheet
    var newSpreadsheet;
    var files = DriveApp.getFilesByName('Kierowcy_per_dzien')
    if(!files.hasNext()){
      newSpreadsheet = SpreadsheetApp.create('Kierowcy_per_dzien');
    } else {
      newSpreadsheet = SpreadsheetApp.open(files.next());
    }
    
    
    // Get the active sheet of the new spreadsheet
    // var resultSheet = newSpreadsheet.getActiveSheet();
  
    
    // Create a new sheet for the result
    var resultSheet = newSpreadsheet.getSheets()[0];
    //clear previous data if any
    resultSheet.getDataRange().clear();
  
    // Create an array to store the data
    var dataArray = [];
  
    var sheetNames = ['A1 Myślenice - Kraków', 'MLD Wieliczka', 'WST'];
  
    for (var k = 0; k < sheetNames.length; k++) {
      var activeSheet = spreadsheet.getSheetByName(sheetNames[k]);
    
      // Get the data range excluding headers
      var dataRange = activeSheet.getDataRange();
      var dataValues = dataRange.getValues();
      
      // Loop through rows (excluding the header row)
      for (var i = 2; i < dataValues.length; i++) {
        // Get the date from the first column
        var date = dataValues[i][0];
  
        // Loop through driver names (excluding the first column)
        for (var j = 1; j < dataValues[i].length; j++) {
          //get the track code
          var track = dataValues[0][j];
  
          // Get the car code
          var car = dataValues[1][j];
  
          // Get the name from the cell
          var name = dataValues[i][j];
  
          // If there is a name, add it to the data array
          if (name !== "") {
            dataArray.push([date, name, car, track]);
          }
        }
      }
    }
  
    // Sort the data array by name and date
    dataArray.sort(function(a, b) {
      var nameComparison = a[1].localeCompare(b[1]);
      if (nameComparison !== 0) {
        return nameComparison;
      }
      return new Date(a[0]) - new Date(b[0]);
    });
  
    var groupedMap = {};
    for (var z = 0; z < dataArray.length; z++) {
        var tempArray = dataArray[z];
        var name = tempArray[1];
        if(!groupedMap[name]){
          groupedMap[name] = [];
        }
        groupedMap[name].push(tempArray);
    }
  
  
    // Write headers to the result sheet
    resultSheet.appendRow(["Data","Kierowca", "Autobus", "Trasa/Zmiana"]);
  
    // Write the sorted data to the result sheet
    dataArray.forEach(function(row) {
      resultSheet.appendRow(row);
    });
  }