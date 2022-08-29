import React from "react";
import style from './ThumbsGallery.module.scss';

class ThumbsGallery extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mainSlideIndex: 0
    }
    this.setMainSlideIndex = this.setMainSlideIndex.bind(this);
  }

  setMainSlideIndex(i){
    this.setState(prev=>({...prev, mainSlideIndex: i}))
  };

  render() {
    return (
      <div className={style.thumbsGallery}>
        <div className={style.sidePreview}>
          {this.props.gallery.map((img, i) => {
            return (
              <img src={img} key={i} className={style.imgPreview} onClick={()=>this.setMainSlideIndex(i)} alt="Preview"/>
            )
          })}
        </div>

        <div className={style.mainSlide}>
          <img src={this.props.gallery[this.state.mainSlideIndex]} alt="mainSlide"/>
        </div>
      </div>
    )
  }
}

export default ThumbsGallery;

