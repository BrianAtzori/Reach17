const writeToLocalStorage = (item, type) => {
  localStorage.setItem(type, JSON.stringify(item));
};

export { writeToLocalStorage };
