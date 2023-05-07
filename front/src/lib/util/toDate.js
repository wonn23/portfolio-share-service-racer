/* eslint-disable no-underscore-dangle */
function toDateString(date) {
  const yyyyMMdd = String(date);
  let sMonth = yyyyMMdd.substring(5, 7);
  const arr = yyyyMMdd.split(' ');

  switch (arr[1]) {
    case 'Jan':
      sMonth = 1;
      break;
    case 'Feb':
      sMonth = 2;
      break;
    case 'Mar':
      sMonth = 3;
      break;
    case 'Apr':
      sMonth = 4;
      break;
    case 'May':
      sMonth = 5;
      break;
    case 'Jun':
      sMonth = 6;
      break;
    case 'Jul':
      sMonth = 7;
      break;
    case 'Aug':
      sMonth = 8;
      break;
    case 'Sep':
      sMonth = 9;
      break;
    case 'Oct':
      sMonth = 10;
      break;
    case 'Nov':
      sMonth = 11;
      break;
    case 'Dec':
      sMonth = 12;
      break;
    default:
      sMonth = 5;
  }

  return `${arr[3]}년 ${sMonth}월 ${arr[2]}일`;
}

export default toDateString;
