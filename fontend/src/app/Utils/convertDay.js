const convert = (time) => {
  const date = new Date(time);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return hours === "00" && minutes === "00"
    ? `${day}/${month}/${year}`
    : `${day}/${month}/${year} ${hours}:${minutes}`;
};

export { convert };
