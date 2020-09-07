import React from "react";

import Currency from "./Currency";
import NoResults from "./NoResults";

import "../styles/modules/result.scss";

function Result(props) {


  return (

    <div className="result">
      {props.currencies.length > 0 ?
        props.priceData && props.currencies.map(currency =>
          (
            <Currency
              key={currency.value}
              amount={props.amount}
              currency={currency.value}
              rate={props.priceData[currency.value].rate_float}
              removeCurrency={props.removeCurrency}
            />
          ))
        : <NoResults />
      }
    </div>

  );


}

export default Result;
