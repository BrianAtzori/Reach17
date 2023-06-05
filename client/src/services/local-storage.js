const writeToLocalStorage = (item, type) => {
  localStorage.setItem(type, JSON.stringify(item));
};

const readLocalStorage = (type) =>{
  return localStorage.getItem(type)
}

export { writeToLocalStorage, readLocalStorage };
