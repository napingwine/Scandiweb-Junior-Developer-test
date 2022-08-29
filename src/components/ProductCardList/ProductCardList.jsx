import React from 'react';
import { connect } from 'react-redux';
import style from './ProductCardList.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import Product from '../../app/helpers/ClassProduct';

class ProductCardList extends Product {
  render() {
    return (
      <div className={`container`}>
        <h2 className={style.title}>{this.props.category.toUpperCase()}</h2>
        <div className={style.cardList}>
          {this.props.products.map((el,i) =>
            <ProductCard
              key={el.id}
              id={el.id}
              name={el.name}
              inStock={el.inStock}
              brand={el.brand}
              img={el.gallery[0]}
              price={this.priceReducer(el.prices, this.props.currency)}
            />
          )}
        </div>
      </div>
    )
  };
};

const mapStateToProps = (state) => ({ category: state.main.currentCategory, products: state.main.currentCategoryProducts, currency: state.main.currency });

export default connect(mapStateToProps, {})(ProductCardList);

