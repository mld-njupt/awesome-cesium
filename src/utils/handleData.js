const handleData = (preData, key) => {
  let timeData = [],
    resData = [];
  preData.map((value) => {
    if (!timeData.includes(value["时间"])) {
      timeData.push(value["时间"]);
      resData.push(value[key]);
    }
  });
  timeData = timeData.map((v) => {
    const tempArr = v.split("");
    tempArr.splice(4, 0, ".");
    tempArr.splice(7, 0, ".");
    return tempArr.join("");
  });
  console.log(timeData);
  return { timeData: timeData, resData: resData };
};
export default handleData;
