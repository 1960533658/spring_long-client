const addZero = (item) => {
  return item > 10 ? item : "0" + item;
};
export default function getNowTime(time) {
  let timeStr = "";
  let date = new Date(time);
  timeStr += date.getFullYear() + "-";
  timeStr += addZero(date.getMonth() + 1) + "-";
  timeStr += addZero(date.getDate()) + " ";
  timeStr += addZero(date.getHours()) + ":";
  timeStr += addZero(date.getMinutes()) + ":";
  timeStr += addZero(date.getSeconds());
  return timeStr;
}
