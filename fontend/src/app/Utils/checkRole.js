const checkInputChecked = (list, value) => {
  return list.find((item) => item.value === value);
};

const checkInputChecked2 = (list, value) => {
  return list?.find((element) => element.id === value);
};

export { checkInputChecked, checkInputChecked2 };
