// function countStudentsPerMentor() {
//   var data = getSheetData();
//   if (data.length === 0) return [];

//   var headers = data[0];
//   var mentorColIndex = headers.indexOf("ครูนิเทศ");

//   if (mentorColIndex == -1) {
//     Logger.log("ไม่พบคอลัมน์ 'ครูนิเทศ'");
//     return [];
//   }

//   var mentorCounts = {};

//   for (var i = 1; i < data.length; i++) {
//     var mentor = data[i][mentorColIndex];
//     if (mentor != " ")
//       if (mentorCounts[mentor]) {
//         mentorCounts[mentor]++;
//       } else {
//         mentorCounts[mentor] = 1;
//       }
//   }

//   var resultData = [];
//   for (var mentor in mentorCounts) {
//     resultData.push([mentor, mentorCounts[mentor]]);
//   }
//   return resultData;
// }

function countStudentsPerMentor() {
  var data = getSheetData();
  if (data.length === 0) return [];

  var headers = data[0];
  var mentorColIndex = headers.indexOf("ครูนิเทศ");

  if (mentorColIndex == -1) {
    Logger.log("ไม่พบคอลัมน์ 'ครูนิเทศ'");
    return [];
  }

  var mentorDetails = {};

  for (var i = 1; i < data.length; i++) {
    var mentor = data[i][mentorColIndex];
    if (mentor && mentor.trim() !== "") {
      if (mentorDetails[mentor]) {
        mentorDetails[mentor].count++;
        mentorDetails[mentor].details.push(data[i]);
      } else {
        mentorDetails[mentor] = {
          count: 1,
          details: [data[i]]
        };
      }
    }
  }

  var resultData = [];
  for (var mentor in mentorDetails) {
    resultData.push([mentor, mentorDetails[mentor].count, mentorDetails[mentor].details]);
  }
  console.log(mentorDetails['ktcm076 นายวิศวะ ดำชมทรัพย์'].details);
  return resultData;
}


function getStudentDetailsByMentor(mentor) {
  var studentData = [];

  var data = getSheetData();
  if (data.length === 0) return [];

  var headers = data[0];
  var mentorColIndex = headers.indexOf("ครูนิเทศ");
  if (mentorColIndex == -1) {
    console.log("ไม่พบคอลัมน์ 'ครูนิเทศ'");
    return [];
  }

  for (var i = 1; i < data.length; i++) {
    if (data[i][mentorColIndex] === mentor) {
      studentData.push(data[i]);
    }
  }
  return studentData;
}
