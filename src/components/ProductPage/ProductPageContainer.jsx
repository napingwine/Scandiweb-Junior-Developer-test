import React from 'react';
import { connect } from 'react-redux';
import { apolloClient } from '../../app/GraphQL/apolloClient';
import { LOAD_ITEM_BY_ID } from '../../app/GraphQL/Queries';
import ProductPage from './ProductPage';
import { addItemToCart } from '../../app/Redux/mainReducer';
import Product from '../../app/helpers/ClassProduct';
import uniqid from 'uniqid';

class ProductPageContainer extends Product {
  constructor(props) {
    super(props)
    this.id = window.location.pathname.split(':')[1]
    this.state = {}
    this.addToCart = this.addToCart.bind(this)
    this.setAttribute = this.setAttribute.bind(this)
  };

  getProduct() {
    apolloClient.query({
      query: LOAD_ITEM_BY_ID,
      variables: { 'ID': this.id }
    }).then(res => {
      this.setState(res.data.product)
    });
  };

  componentDidMount() {
    this.getProduct();
  };

  addToCart() {
    this.props.addItemToCart({ ...this.state, amount: 1, itemListID: uniqid() })
  };

  setAttribute(obj) {
    this.setState(prev => {
      let newProduct = JSON.parse(JSON.stringify(prev))
      const attributeIndex = newProduct.attributes.findIndex(el => el.id === obj.attributeID);
      newProduct.attributes[attributeIndex].items.map(el => {
          if (el.id === obj.attribute.id) {
            return el.selected = true
          } else {
            return el.selected = false
          }
      })
      return newProduct;
    })
  };

  render() {
    const { brand, name, prices, id, gallery, attributes, description, inStock } = this.state;
    const { currency } = this.props;

    return (
      <>
        {name
          ? <ProductPage
            brand={brand}
            name={name}
            price={this.priceReducer(prices, currency)}
            setAttribute={this.setAttribute}
            addToCart={this.addToCart}
            id={id}
            gallery={gallery}
            attributes={attributes}
            description={description}
            inStock={inStock} />
          : <div>Loading</div>
        }
      </>
    )
  };
};

const mapStateToProps = state => ({ currency: state.main.currency });

export default connect(mapStateToProps, { addItemToCart })(ProductPageContainer);