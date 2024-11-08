export const checkCategories = (list, item) => {
  return list?.find((value) => value.id === item?.id);
};
