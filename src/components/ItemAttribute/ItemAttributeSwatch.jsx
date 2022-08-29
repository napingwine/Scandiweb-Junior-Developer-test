import React from "react";
import style from './ItemAttribute.module.scss';

class ItemAttributeSwatch extends React.Component {
  render() {
    const { value, selected, attributeID, itemID, attribute, setAttribute, isMiniCartStyle } = this.props
    return (
      <button
        className={`${style.attribute_button_color} ${selected ? style.activeAttributeSwatch : ''} ${isMiniCartStyle? style.mini: ''}`}
        onClick={() => setAttribute({ attributeID, itemID, attribute })}
      >
        <div style={{ backgroundColor: `${value}` }}></div>
      </button>
    )
  }
};

export default ItemAttributeSwatch;