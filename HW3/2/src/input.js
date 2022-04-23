import React, { useState } from "react";
import { validate } from "./validators";

const INPUT_STATES = {
  UNTOUCHED: "UNTOUCHED",
  VALID: "VALID",
  INVALID: "INVALID",
};

const Input = (props) => {
  const [inputUntouched, inputUntouchedset] = useState(INPUT_STATES.UNTOUCHED);
  const [inputIsValid, setInputIsValid] = useState(INPUT_STATES.VALID);

  const inputOnblurhandler = (event) => {
    inputUntouchedset("TOUCHED");
    setInputIsValid(
      validate(event.target.value, props.validators) === true
        ? "VALID"
        : "INVALID"
    );
  };

  const inputOnchangehandler = (event) => {
    setInputIsValid(
      validate(event.target.value, props.validators) === true
        ? "VALID"
        : "INVALID"
    );
  };
  const error = (inputIsValid === "VALID" ? true : false)
    ? true
    : inputUntouched === "UNTOUCHED"
    ? true
    : false;

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
