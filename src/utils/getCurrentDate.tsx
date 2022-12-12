export function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  console.log(`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`)
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }