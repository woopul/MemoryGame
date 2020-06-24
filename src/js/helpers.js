const getScoreRecords = () => ( JSON.parse(localStorage.getItem("scoreList")) );
const pushRecordsToDB = listOfRecords => {
  localStorage.setItem("scoreList", JSON.stringify(listOfRecords));
}

export const addRecord = (newRecord) => {
  let listOfRecords = getScoreRecords();
  listOfRecords.push(newRecord);
  pushRecordsToDB(listOfRecords);
}

export const printScoreRecords = () => {
  console.log(getScoreRecords());
}