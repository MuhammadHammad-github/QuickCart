import { LoadingButton } from "@mui/lab";
import React from "react";

const MyButton = ({
  text,
  className,
  onClick = () => {},
  type = "button",
  icon,
  disabled = false,
  loading = false,
}) => {
  return (
    <LoadingButton
      className={`${className} btn btn-lg w-max  transitional   btn-primary`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      loading={loading}
    >
      {icon}
      {text}
      {loading && "..."}
    </LoadingButton>
  );
};

export default MyButton;
