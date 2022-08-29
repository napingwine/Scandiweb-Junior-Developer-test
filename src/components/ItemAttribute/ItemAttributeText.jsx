import React from "react";
import style from './ItemAttribute.module.scss';

class ItemAttributeText extends React.Component {
  render() {
    const {selected, attributeID, itemID, attribute, setAttribute, displayValue, isMiniCartStyle } = this.props
    return (
      <button
        className={`${style.attribute_button} ${selected ? style.activeAttribute : ''} ${isMiniCartStyle? style.mini: ''}`}
        onClick={() => setAttribute({ attributeID, itemID, attribute })}
      >
        {displayValue}
      </button>
    )
  }
}

export default ItemAttributeText;