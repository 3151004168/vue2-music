export const format = (timeStamp) => {
  let date = new Date(timeStamp);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  // var h = date.getHours();
  // h = h < 10 ? "0" + h : h;
  // var minute = date.getMinutes();
  // minute = minute < 10 ? "0" + minute : minute;
  // var second = date.getSeconds();
  // second = second < 10 ? "0" + second : second;
  // + " " + h + ":" + minute + ":" + second
  return y + "-" + m + "-" + d;
};

export const fomatMinute = (ms) => {
  const data = ms / 1000 / 60;
  const min = Math.floor(data);
  let sec = (data.toFixed(2) - min).toFixed(2) * 60;
  let second = Math.floor(sec);
  if (second < 10) {
    second = "0" + second;
  }
  const minute = min + ":" + second;
  return minute;
};
