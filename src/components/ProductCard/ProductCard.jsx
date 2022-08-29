import React from 'react';
import style from './ProductCard.module.scss';
import EmptyCartWhite from '../../asset/img/EmptyCartWhite.png';
import { connect } from 'react-redux';
import { addItemToCart } from '../../app/Redux/mainReducer';
import { apolloClient } from '../../app/GraphQL/apolloClient';
import { LOAD_ITEM_BY_ID } from '../../app/GraphQL/Queries';
import { NavLink } from 'react-router-dom';
import uniqid from 'uniqid';

class ProductCard extends React.Component {

  addItemToCartFunc(id, inStock) {
    if (inStock) {
      apolloClient.query({
        query: LOAD_ITEM_BY_ID,
        variables: { 'ID': id }
      }).then(res => this.props.addItemToCart({ ...res.data.product, amount: 1, itemListID: uniqid() }));
    }
  };

  render() {
    const { id, name, price, img, brand, inStock } = this.props;
    return (
      <NavLink to={`/id:${id}`} className={style.card} >
        {!inStock ? <div className={style.notInStockOverlay}><span>OUT OF STOCK</span></div> : ''}
        <div className={style.image}>
          <img src={img} alt={name} />
        </div>
        {inStock
          ? <button className={style.addToCart} onClick={e =>{ 
            this.addItemToCartFunc(id, inStock) 
            e.preventDefault()}}>
            <img src={EmptyCartWhite} alt='EmptyCartWhite' />
          </button>
          : ''
        }
        <div className={style.content}>
          <span className={style.name}>{brand} {name}</span>
          <span className={style.price}>{price.symbol}{price.amount} </span>
        </div>
      </NavLink>
    )
  }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { addItemToCart })(ProductCard);