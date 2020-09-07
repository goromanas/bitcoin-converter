import React, { useEffect, useState } from "react";
import "./App.scss";
import Axios from "axios";
import { Container, Box, Paper } from "@material-ui/core";
import Input from "./components/Input";
import Result from "./components/Result";
import Loader from "./components/Loader";
import Title from "./components/Title";

const CURRENT_PRICE_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

function App() {
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [currenciesToAdd, setCurrenciesToAdd] = useState([]);
  const [currencies, setCurrencies] = useState([
    { value: 'EUR', text: 'EUR' },
    { value: 'GBP', text: 'GBP' },
    { value: 'USD', text: 'USD' },
  ]);

  async function fetchPrice(priceRequest) {
    try {
      const response = await Axios.get(CURRENT_PRICE_URL, { cancelToken: priceRequest.token });
      setPriceData(response.data.bpi);
      setLoading(false);
    } catch (e) {
      console.log("There was a problem or the request was cancelled.");
    }
  }

  useEffect(() => {
    const priceRequest = Axios.CancelToken.source();
    fetchPrice(priceRequest);
    return () => {
      priceRequest.cancel();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
      const priceRequest = Axios.CancelToken.source();
      fetchPrice(priceRequest);
      return () => {
        priceRequest.cancel();
      };
    }, 1000 * 60);
    return () => clearInterval(interval);
  });

  return (
    <Box className="App__wrapper">
      <Container className="App__container">
        <Paper elevation={3}>
          <Loader loading={loading} />
          <Title />
          <Input
            setAmount={setAmount}
            currencies={currenciesToAdd}
            addCurrency={addCurrency}
          />
          <Result
            amount={amount}
            currencies={currencies}
            priceData={priceData}
            removeCurrency={removeCurrency}
          />
        </Paper>
      </Container>
    </Box>
  );

  function removeCurrency(currency) {
    const values = [...currencies];
    const outputValues = values.filter(value => value.value !== currency);
    const outputCurrency = [...currenciesToAdd];
    outputCurrency.push({ value: currency, text: currency });
    outputCurrency.sort(compareCurrencies);
    setCurrenciesToAdd(outputCurrency);
    setCurrencies(outputValues);
  }

  function addCurrency(currency) {
    const values = [...currencies];
    values.push({ value: currency, text: currency });
    values.sort(compareCurrencies);
    const valuesToAdd = [...currenciesToAdd];
    const outputValues = valuesToAdd.filter(value => value.value !== currency);
    setCurrencies(values);
    setCurrenciesToAdd(outputValues);
  }

  function compareCurrencies(a, b) {
    const currencyA = a.value;
    const currencyB = b.value;

    let comparison = 0;
    if (currencyA > currencyB) {
      comparison = 1;
    } else if (currencyA < currencyB) {
      comparison = -1;
    }
    return comparison;
  }
}

export default App;
