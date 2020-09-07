import React, { useState } from "react";

import { TextField } from "@material-ui/core";

import CurrencySelector from "./CurrencySelector";

import "../styles/modules/input.scss";

function Input(props) {

  const [error, setError] = useState(false);
  const [helperText, sethelperText] = useState('');
  return (
    <div className="input">
      <TextField
        error={error}
        id="standard-basic"
        label="BTC"
        type="number"
        helperText={helperText}
        onChange={(e) => handleChange(e)}
        className="input__currency"
      />
      <CurrencySelector
        currencies={props.currencies}
        addCurrency={props.addCurrency}
      />
    </div>

  );

  function handleChange(e) {
    const inputValue = e.target.value;
    if (inputValue < 0) {
      handleMinError(true);
    } else if (inputValue > 1000000000000) {
      handleMaxError(true);
    }
    else {
      handleMinError(false);
      handleMaxError(false);
      props.setAmount(e.target.value);
    }
  }

  function handleMinError(display) {
    if (display) {
      setError(true);
      sethelperText('Value must be positive')
    } else {
      setError(false);
      sethelperText('');
    }
  }

  function handleMaxError(display) {
    if (display) {
      setError(true);
      sethelperText('Value must be less than 1 trillion')
    } else {
      setError(false);
      sethelperText('');
    }
  }
}

export default Input;
