import { useState } from "react";
import { ChromePicker } from "react-color";
const MyColorPicker = () => {
  const [color, setColor] = useState("#ff0000");

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return (
    <div
      style={{
        textAlign: "center",
        userSelect: "none", // Disable dragging
      }}
    >
      <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
    </div>
  );
};
export default MyColorPicker;
