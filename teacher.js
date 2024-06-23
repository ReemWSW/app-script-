function countStudentsPerMentor() {
  var data = getSheetData();
  if (data.length === 0) return [];

  var headers = data[0];
  var mentorColIndex = headers.indexOf("ครูนิเทศ");
  
  if (mentorColIndex == -1) {
    Logger.log("ไม่พบคอลัมน์ 'ครูนิเทศ'");
    return [];
  }

  var mentorCounts = {};

  for (var i = 1; i < data.length; i++) {
    var mentor = data[i][mentorColIndex];
    if (mentorCounts[mentor]) {
      mentorCounts[mentor]++;
    } else {
      mentorCounts[mentor] = 1;
    }
  }
  
  var resultData = [];
  for (var mentor in mentorCounts) {
    resultData.push([mentor, mentorCounts[mentor]]);
  }
  
  return resultData;
}
