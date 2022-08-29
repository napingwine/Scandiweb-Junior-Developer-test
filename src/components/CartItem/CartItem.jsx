import React from 'react';
import { connect } from 'react-redux';
import style from './CartItem.module.scss';
import { increaseItemAmount, decreaseItemAmount, setAttribute } from '../../app/Redux/mainReducer';
import Gallery from './Gallery';
import ItemAttribute from '../ItemAttribute/ItemAttribute';
import Product from '../../app/helpers/ClassProduct';

class CartItem extends Product {
  render() {
    const { currency } = this.props.main;
    const { amount, brand, name, prices, attributes, id, gallery, itemListID } = this.props.item;
    const { isMiniCartStyle } = this.props

    return (
      <div className={style.cartItem}>
        <div className={`${style.info} ${isMiniCartStyle ? style.mini : ''}`}>
          <div className={`${style.brandName} ${isMiniCartStyle ? style.mini : ''}`}>{brand}</div>
          <div className={`${style.itemName} ${isMiniCartStyle ? style.mini : ''}`}>{name}</div>
          <div className={`${style.itemPrice} ${isMiniCartStyle ? style.mini : ''}`}>{this.priceReducer(prices, currency).symbol}{this.priceReducer(prices, currency).amount}</div>
          {attributes.map((attribute, i) =>
            <ItemAttribute
              key={id + i}
              itemID={itemListID}
              setAttribute={this.props.setAttribute}
              isMiniCartStyle={isMiniCartStyle}
              attribute={attribute} />
          )}
        </div>
        <div className={`${style.amount} ${isMiniCartStyle ? style.mini : ''}`}>
          <button className={`${style.button} ${isMiniCartStyle ? style.mini : ''}`} onClick={() => this.props.increaseItemAmount(itemListID)}>
            <span className={`${style.vectorPlus} ${isMiniCartStyle ? style.mini : ''}`} />
            <span className={`${style.vectorMinus} ${isMiniCartStyle ? style.mini : ''}`} />
          </button>
          {amount}
          <button className={`${style.button} ${isMiniCartStyle ? style.mini : ''}`} onClick={() => this.props.decreaseItemAmount(itemListID)}>
            <span className={`${style.vectorMinus} ${isMiniCartStyle ? style.mini : ''}`} />
          </button>
        </div>
        <div className={style.gallery}>
          <Gallery gallery={gallery} isMiniCartStyle={isMiniCartStyle} />
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, { increaseItemAmount, decreaseItemAmount, setAttribute })(CartItem);