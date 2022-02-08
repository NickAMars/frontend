export const getColors = (data) => {
  let collectColors = [];
  for (let [color] of Object.entries(data)) {
    collectColors.push(color);
  }

  return collectColors;
};

export const convertIntoBody = (datas) => {
  const body = [];
  for (let data of datas) {
    body.push({ name: data.name, color: data.color });
  }
  return body;
};
