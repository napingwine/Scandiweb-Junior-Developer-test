import React from 'react';

class Cart extends React.Component {

  getTotal(cartList, currency) {
    if (cartList.length > 0) {
      return cartList.reduce((acc, cur) => {
        const amount = cur.amount;
        const price = () => {
          const currencyIndex = cur.prices.findIndex(el => el.currency.label === currency.label);
          return cur.prices[currencyIndex].amount;
        }
        acc = acc + price() * amount;
        return acc;
      }, 0).toFixed(2)
    } else {
      return 0;
    }
  };
};

export default Cart;