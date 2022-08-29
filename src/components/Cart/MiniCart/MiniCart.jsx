import React from 'react';
import { connect } from 'react-redux';
import style from './MiniCart.module.scss';
import { showMiniCart } from '../../../app/Redux/mainReducer';
import CartItem from '../../CartItem/CartItem';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';
import SecondaryButton from '../../SecondaryButton/SecondaryButton';
import { NavLink } from 'react-router-dom';
import Cart from '../Cart';

class MiniCart extends Cart {
  constructor(props) {
    super(props)
    this.hideMiniCart = this.hideMiniCart.bind(this)
    this.getTotal = this.getTotal.bind(this)
  };

  hideMiniCart() {
    this.props.showMiniCart(false)
  };

  render() {
    const { cartList, isShowMiniCart, totalItems, currency } = this.props;
    return (
      <div
        className={style.miniCartWrapper}
        style={{ display: `${isShowMiniCart ? '' : 'none'}` }}
        onClick={e => this.hideMiniCart(e)}
      >
        <div className={style.container} onClick={e => e.stopPropagation()}>
          <div className={style.miniCart} onMouseLeave={this.hideMiniCart}>
            <div className={style.title}><span>My Bag</span> {totalItems} {totalItems === 1 ? 'item' : 'items'} </div>
            {cartList.map(el => <CartItem key={el.itemListID} item={el} isMiniCartStyle={true} />)}
            <div className={style.total}>
              <span className={style.total__title}>Total</span>
              <span className={style.total__amount}>{currency.symbol} {this.getTotal(cartList, currency)}</span>
            </div>
            <section className={style.buttons}>
              <NavLink to='/cart' style={{ 'width': '100%', 'flexGrow': '1', 'marginRight': '12px' }}>
                <SecondaryButton style={{ 'padding': '13px', 'width': '100%' }}>VIEW BAG</SecondaryButton>
              </NavLink>
              <PrimaryButton style={{ 'padding': '12px', 'width': '100%', 'flexGrow': '1' }}>CHECK OUT</PrimaryButton>
            </section>
          </div>
        </div>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  cartList: state.main.cartList,
  isShowMiniCart: state.main.showMiniCart,
  totalItems: state.main.itemsAmountInCart,
  currency: state.main.currency
});

export default connect(mapStateToProps, { showMiniCart })(MiniCart);