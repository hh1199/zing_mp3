import React, { memo } from "react";

const Button = ({ text, style }) => {
  return (
    <Button
      type="button"
      className={
        style
          ? style
          : "py-1 px-4 rounded-l-full rounded-r-full border bg-transparent"
      }
    >
      {text}
    </Button>
  );
};

export default memo(Button);
