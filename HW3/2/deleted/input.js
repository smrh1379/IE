import React, { useState } from "react";
import { validate } from "./validators";

const INPUT_STATES = {
  UNTOUCHED: "UNTOUCHED",
  VALID: "VALID",
  INVALID: "INVALID",
};

const Input = (props) => {
  const [inputUntouched, inputUntouchedset] = useState(true);
  const [inputValue, inputValueset] = useState("");
  const [inputIsValid, setInputIsValid] = useState(true);

  const inputOnblurhandler = (event) => {
    if (inputValue.trim() === "") {
      inputUntouchedset(false);
      setInputIsValid(false);
    }
  };

  const inputOnchangehandler = (event) => {
    inputUntouchedset(true);
    inputValueset(event.target.value);
    setInputIsValid(validate(event.target.value, props.validators));
  };
  const error = inputUntouched && inputIsValid;
  console.log(error);
  const form = `form-input ${error ? "" : "form-input--invalid"}`;
  return (
    <div className={form} data-testid="form-input">
      <label htmlFor="{props.id}">{props.label}</label>
      <input onBlur={inputOnblurhandler} onChange={inputOnchangehandler} />
      {!error && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
