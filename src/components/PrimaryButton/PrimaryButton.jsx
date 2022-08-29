import React from 'react';
import style from './PrimaryButton.module.scss';

class PrimaryButton extends React.Component {
  render() {
    return (
      <button
        className={`${style.primaryButton} ${this.props.additionalclassname}`}
        {...this.props}
      >
        {this.props.children}
      </button>
    )
  };
};

export default PrimaryButton