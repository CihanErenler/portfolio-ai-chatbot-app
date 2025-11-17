const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(
    `Please double check your class name, no element returned for ${selector}`
  );
};

export default getElement;
