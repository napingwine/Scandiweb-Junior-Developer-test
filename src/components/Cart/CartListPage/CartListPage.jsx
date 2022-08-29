import React from 'react';
import { connect } from 'react-redux';
import style from './CartListPage.module.scss';
import CartItem from '../../CartItem/CartItem';
import Cart from '../Cart';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';

class CartList extends Cart {

  constructor(props) {
    super(props)
    this.getTotal = this.getTotal.bind(this)
  };

  render() {
    const { cartList, itemsAmountInCart, currency } = this.props;
    return (
      <div className={`container`}>
        <h2 className={style.title}>CART</h2>
        <section className={style.itemList}>
          <div className={style.separator}></div>
          {cartList.map(el => <div key={el.itemListID}><CartItem key={el.id} item={el} /><div key={el.id + 1} className={style.separator} /></div>)}
        </section>
        <section className={style.final}>
          <div className={style.final__tax}>Tax 21%: <span>{currency.symbol} {(this.getTotal(cartList, currency) * 0.21).toFixed(2)}</span></div>
          <div className={style.final__quantity}>Quantity: <span>{itemsAmountInCart}</span></div>
          <div className={style.final__total}>Total: <span>{currency.symbol} {this.getTotal(cartList, currency)}</span></div>
          <PrimaryButton style={{ 'minWidth': '279px', 'padding': '13px', 'marginTop': '5px' }}>
            ORDER
          </PrimaryButton>
        </section>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  cartList: state.main.cartList,
  itemsAmountInCart: state.main.itemsAmountInCart,
  currency: state.main.currency
});

export default connect(mapStateToProps, {})(CartList);