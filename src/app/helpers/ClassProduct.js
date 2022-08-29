import React from "react";

class Product extends React.Component {
  priceReducer(productPrices, currency) {
    return productPrices.reduce((acc, cur) => {
      if (cur.currency.label === currency.label) {
        acc = { amount: cur.amount, symbol: cur.currency.symbol }
      }
      return acc;
    }, {})
  };
};

export default Product;