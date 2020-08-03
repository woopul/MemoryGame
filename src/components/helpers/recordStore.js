const getScoreRecords = () => {
  return JSON.parse(localStorage.getItem("scoreList")) ?  
         JSON.parse(localStorage.getItem("scoreList"))
         : [];
};
const pushRecordsToDB = listOfRecords => {
  localStorage.setItem("scoreList", JSON.stringify(listOfRecords));
}

export const addRecord = (newRecord) => {
  let listOfRecords = getScoreRecords();
  listOfRecords.push(newRecord);
  pushRecordsToDB(listOfRecords);
  return listOfRecords;
}

export const logScoreRecords = () => {
  console.table(getScoreRecords());
}