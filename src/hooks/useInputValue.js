import { useState } from "react";

const useInputValue = (defaultValue) => {
  const [inputValue, setinputValue] = useState(defaultValue);
  const handleChange = (e) => {
    setinputValue(e.target.value);
  };
  return { value: inputValue, onChange: handleChange };
};
export default useInputValue;
