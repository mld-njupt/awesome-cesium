const handleData = (preData, key) => {
  let timeData = [],
    resData = [];
  preData.map((value) => {
    if (!timeData.includes(value["时间"])) {
      timeData.push(value["时间"]);
      resData.push(value[key]);
    }
  });

  return { timeData: timeData, resData: resData };
};
export default handleData;
