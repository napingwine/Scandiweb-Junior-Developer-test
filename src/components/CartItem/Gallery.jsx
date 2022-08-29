import React from "react";
import style from './Gallery.module.scss';

class Gallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      curImageIndex: 0
    };

    this.nextImg = this.nextImg.bind(this)
    this.prevImg = this.prevImg.bind(this)
  };

  nextImg() {
    this.setState(prev => {
      if (prev.curImageIndex > this.props.gallery.length - 2) {
        return { ...prev, curImageIndex: 0 }
      } else {
        return { ...prev, curImageIndex: this.state.curImageIndex + 1 }
      }
    })
  };

  prevImg() {
    this.setState(prev => {
      if (prev.curImageIndex === 0) {
        return { ...prev, curImageIndex: this.props.gallery.length - 1 }
      } else {
        return { ...prev, curImageIndex: prev.curImageIndex - 1 }
      }
    })
  };

  render() {
    const { isMiniCartStyle } = this.props
    return (
      <div className={`${style.gallery} ${isMiniCartStyle? style.mini : ''}`}>
        <img src={this.props.gallery[this.state.curImageIndex]} alt='Gallery' />
        <button className={`${style.buttonPrev}  ${isMiniCartStyle? style.mini : ''}`} onClick={this.prevImg}><span/></button>
        <button className={`${style.buttonNext}  ${isMiniCartStyle? style.mini : ''}`} onClick={this.nextImg}><span/></button>
      </div>
    )
  };
};

export default Gallery;
