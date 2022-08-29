import React from 'react';
import style from './SecondaryButton.module.scss';

class SecondaryButton extends React.Component {
  render() {
    return (
      <button
        className={style.secondaryButton}
        {...this.props}>
        {this.props.children}
      </button>
    )
  };
};

export default SecondaryButton;