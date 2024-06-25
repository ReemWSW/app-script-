function getStudentsUnderMentor(mentorName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Change 'Sheet1' to your sheet's name
  var data = sheet.getDataRange().getValues();

  var students = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var supervisor = row[2]; // Column index for "ครูนิเทศ"

    if (supervisor === mentorName) {
      var studentDetails = {
        name: row[3], // Assuming the 4th column is "ชื่อนักเรียน นักศึกษา"
        id: row[4], // Assuming the 5th column is "รหัสประจำตัวนักเรียน นักศึกษา"
        field: row[5], // Assuming the 6th column is "สาขาวิชา"
        level: row[6], // Assuming the 7th column is "ระดับการศึกษา"
        // Add more fields as necessary
      };
      students.push(studentDetails);
    }
  }

  return students;
}

function countStudentsPerMentor() {
  var data = getSheetData();
  if (data.length === 0) return [];

  var result = {};
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var supervisor = row[2]; // Column index for "ครูนิเทศ"

    if (!result[supervisor]) {
      result[supervisor] = {
        count: 0,
        students: [],
      };
    }
    var studentDetails = {
      name: row[3], // Assuming the 4th column is "ชื่อนักเรียน นักศึกษา"
      id: row[4], // Assuming the 5th column is "รหัสประจำตัวนักเรียน นักศึกษา"
      field: row[5], // Assuming the 6th column is "สาขาวิชา"
      level: row[6], // Assuming the 7th column is "ระดับการศึกษา"
      count: 1, // Initialize count
    };

    // Check if student already exists in the list
    var existingStudent = result[supervisor].students.find(
      (student) => student.name === studentDetails.name
    );
    if (existingStudent) {
      existingStudent.count += 1; // Increment count if student already exists
    } else {
      result[supervisor].students.push(studentDetails);
    }

    result[supervisor].count++;
  }
  return result;
}
