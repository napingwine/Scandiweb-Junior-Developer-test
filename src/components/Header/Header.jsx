import React from 'react';
import style from './Header.module.scss';
import logo from '../../asset/img/logo.png';
import cart from '../../asset/img/EmptyCart.png';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header className={`container ${style.header}`}>
        <NavLink to='' className={style.categories}>
          {this.props.categories.map((el, i) => {
            return (
              <button
                key={i}
                className={`${style.categoryButton} ${el === this.props.currentCategory ? style.active : ''}`}
                onClick={() => this.props.onCategorySelect(el)}
              >
                {el.toUpperCase()}
              </button>
            )
          })}
        </NavLink>

        <NavLink to=''>
          <img src={logo} alt='logo' />
        </NavLink>

        <div className={style.currenciesAndCart}>
          <span className={style.dropdown}>
            <div className={style.cHover}>{this.props.currentCurrency?.symbol}</div>
            <div className={style.cList}>
              {this.props.currencies.map(el =>
                <span key={el.label} onClick={() => this.props.setCurrentCurrency(el)}>
                  {el.symbol} {el.label}
                </span>
              )}
            </div>
          </span>
          <NavLink to='/cart' onMouseEnter={this.props.showMiniCart} onMouseLeave={this.props.hideMiniCart} className={style.cart}>
            <img src={cart} alt='logo' />
            <span className={style.totalItemsInCart} style={this.props.itemsAmountInCart === 0 ? { display: "none" } : {}}>
              {this.props.itemsAmountInCart}
            </span>
          </NavLink>
        </div>
      </header>
    )
  }
};

export default Header;