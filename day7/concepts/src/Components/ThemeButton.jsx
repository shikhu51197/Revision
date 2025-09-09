
const ThemeButton = ({ label, theme }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-semibold";
  const themeStyle =
    theme === "primary"
      ? "bg-blue-500 text-white"
      : "bg-gray-200 text-black";

  return <button className={`${baseStyle} ${themeStyle}`}>{label}</button>;
};


export default ThemeButton;
