const handleData = (preData, key1, key2) => {
  let timeData = [],
    resData = [];
  preData.map((value) => {
    if (!timeData.includes(value[key2])) {
      timeData.push(value[key2]);
      resData.push(value[key1]);
    }
  });
  timeData = timeData.map((v) => {
    const len = v.length;
    if (len === 8) {
      const tempArr = v.split("");
      tempArr.splice(4, 0, ".");
      tempArr.splice(7, 0, ".");
      return tempArr.join("");
    } else if (len === 6) {
      const tempArr = v.split("");
      tempArr.splice(4, 0, ".");
      return tempArr.join("");
    } else {
      return v;
    }
  });
  return { timeData: timeData, resData: resData };
};
export default handleData;
