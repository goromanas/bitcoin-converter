import React, { useState, useEffect } from "react";

import CloseIcon from '@material-ui/icons/Close';
import { Card, CardHeader, Avatar, IconButton } from "@material-ui/core";

import "../styles/modules/currency.scss";

function Currency(props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue((props.amount * parseFloat(props.rate))
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }, [props.amount, props.rate]);
  return (
    <Card className="currency">
      <CardHeader
        avatar={
          <Avatar aria-label="currency" className="currency__avatar">
            {handleCurrencyIcon(props.currency)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        }
        title={value}
      />
    </Card>
  )
  function handleClose() {
    props.removeCurrency(props.currency);
  }

  function handleCurrencyIcon(currency) {
    switch (currency) {
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'USD':
        return '$';
      default:
        return '';
    }
  };
}

export default Currency