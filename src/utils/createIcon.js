const createIcon = (iconSrc) => {
  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.alt = "Icon";
  icon.classList.add("icon");
  return icon;
};

export default createIcon;
