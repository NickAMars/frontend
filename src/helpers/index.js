export const getColors = (data) => {
  let collectColors = [];
  for (let [color, ] of Object.entries(data)) {
    collectColors.push(color);
  }

  return collectColors;
};

export const convertIntoBody = (datas) => {
  const body = {};
  for (let data of datas) {
    body[data.name] = data.color;
  }
  return body;
};
