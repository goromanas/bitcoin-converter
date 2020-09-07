import React, { useState } from "react"

import { FormControl, InputLabel, Select, FormHelperText, MenuItem, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import "../styles/modules/currency.scss";

function CurrencySelector(props) {

  const [selectedCurrency, setSelectedCurrency] = useState('');

  return (
    <>
      <FormControl
        disabled={props.currencies.length <= 0 ? true : false}
      >
        <InputLabel htmlFor="add-currency">Currency</InputLabel>
        <Select
          onChange={(e) => handleChange(e)}
          value={selectedCurrency}
        >
          {
            props.currencies.map(currency =>
              <MenuItem
                key={currency.value}
                value={currency.value}
              >
                {currency.value}
              </MenuItem>
            )
          }

        </Select>
        <FormHelperText>Select a currency to add</FormHelperText>

      </FormControl >
      <Fab
        onClick={() => handleAddCurrency()}
        color="primary"
        disabled={validateAddCurrency()}
        className="currency__button"
      >
        <AddIcon />
      </Fab>
    </>
  )
  function handleChange(event) {
    setSelectedCurrency(event.target.value);
  };

  function validateAddCurrency() {
    if (props.currencies.length <= 0 || selectedCurrency === '') {
      return true;
    }
    return false;
  }

  function handleAddCurrency() {
    props.addCurrency(selectedCurrency);
    setSelectedCurrency('');
  }
}

export default CurrencySelector