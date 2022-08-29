import React from "react";
import style from './ItemAttribute.module.scss';
import ItemAttributeSwatch from "./ItemAttributeSwatch";
import ItemAttributeText from "./ItemAttributeText";

class ItemAttribute extends React.Component {
  render() {
    const { attribute, setAttribute, itemID, isMiniCartStyle } = this.props
    return (
      <div className={style.attribute}>
        <span className={`${style.attributeName} ${isMiniCartStyle ? style.mini : ''}`}>{attribute.name.toUpperCase()}:</span>
        <div>
          {attribute.items.map(item => {
            if (attribute.type === 'text') {
              return <ItemAttributeText
                key={item.value}
                selected={item.selected}
                attributeID={attribute.id}
                itemID={itemID}
                attribute={item}
                setAttribute={setAttribute}
                displayValue={item.displayValue}
                isMiniCartStyle={isMiniCartStyle}
              />
            } else if (attribute.type === 'swatch') {
              return <ItemAttributeSwatch
                key={item.value}
                value={item.value}
                selected={item.selected}
                attributeID={attribute.id}
                itemID={itemID}
                attribute={item}
                setAttribute={setAttribute}
                isMiniCartStyle={isMiniCartStyle}
              />
            }
            return <div>Unknown Attribute</div>
          })}
        </div>
      </div>
    )
  }
};

export default ItemAttribute;

