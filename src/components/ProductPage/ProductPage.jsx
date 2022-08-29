import React from 'react';
import ItemAttribute from '../ItemAttribute/ItemAttribute';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import ThumbsGallery from '../ThumbsGallery/ThumbsGallery';
import style from './ProductPage.module.scss';

class ProductPage extends React.Component {
  render() {
    const { brand, name, price, id, gallery, attributes, description, inStock, setAttribute, addToCart } = this.props;
    return (
      <div className={`container ${style.productPage}`}>
        <div >
          <ThumbsGallery gallery={gallery} />
        </div>

        <div className={style.info}>
          <div className={style.title}>
            <span className={style.brand}>{brand}</span>
            <span className={style.name}>{name}</span>
          </div>
          <div className={style.attributes}>
            {attributes.map((attribute, i) =>
              <ItemAttribute
                key={id + i}
                itemID={id}
                setAttribute={setAttribute}
                attribute={attribute} />
            )}
          </div>
          <div>
            <div className={style.priceTitle}>PRICE:</div>
            <div className={style.priceValue}>{price.symbol}{price.amount}</div>
          </div>
          {inStock ?
            <PrimaryButton additionalclassname={`${style.primary_btn}`} onClick={addToCart} >
              ADD TO CART
            </PrimaryButton>
            :
            <PrimaryButton additionalclassname={`${style.outOfStock}`} disabled={true}>
              OUT OF STOCK
            </PrimaryButton>
          }

          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
    )
  };
};

export default ProductPage;